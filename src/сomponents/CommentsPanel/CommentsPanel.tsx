import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Divider } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Button, Popover, TextField, Tooltip } from "@mui/material";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import i18n from "@emoji-mart/data/i18n/de.json";
import {
  IUserDto,
  initIUserDto,
} from "../AdminPage/UserAdmin/interfaces/IUserDto";
i18n.search_no_results_1 = "Aucun emoji";

interface IComment {
  id: number;
  creationTime: string;
  commentText: string;
  userId: number;
  userName: string;
  userLogo: string;
}

interface INewComment {
  commentText: string;
  userId: number;
  eventId: number;
  postId: number;
}

interface CommentsProps {
  location: {
    entity: string | undefined;
    entityId: string | undefined;
  };
}

export default function CommentPanel(props: CommentsProps): JSX.Element {
  const [entity] = useState(props.location.entity);
  const [entityId] = useState(props.location.entityId);
  const [isNewData, setIsNewData] = useState(false);
  const [commentsList, setCommentsList] = useState<IComment[]>();
  const [comment, setComment] = useState("");
  const [newComment, setNewComment] = useState<INewComment>({
    commentText: "",
    userId: 0,
    eventId: 0,
    postId: 0,
  });
  const maxCharacterCount = 950;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [me, setMe] = useState<IUserDto>(initIUserDto);
  const [isPanelShow, setIsPanelShow] = useState<boolean | null>(null);
  const isLogined = localStorage.getItem("IMKER");

  useEffect(() => {
    async function getListOfComments() {
      try {
        const response = await axios.get(
          `/api/comment/${entity}?id=${entityId}`
        );
        setCommentsList(response.data.commentsList);

        if (isLogined === "true") {
          const getMyId = await axios.get(`/api/me`, {
            withCredentials: true,
          });
          const userDto = getMyId.data;
          setMe(userDto);
        }
        setIsPanelShow(me.role === "ADMIN" || me.role === "MEMBER");
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    }
    getListOfComments();
  }, [entity, entityId, isLogined, isNewData, me.role]);

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (text.length <= maxCharacterCount) {
      const newCommentData =
        entity === "event"
          ? {
              commentText: e.target.value,
              userId: me.id,
              eventId: Number(entityId),
              postId: 0,
            }
          : {
              commentText: e.target.value,
              userId: me.id,
              eventId: 0,
              postId: Number(entityId),
            };

      setComment(e.target.value);
      setNewComment(newCommentData);
    }
  };

  const handleAddComment = async () => {
    if (comment.trim().length > 0) {
      try {
        await axios.post("/api/comment", newComment, {
          withCredentials: true,
        });
      } catch (error) {
        console.error("There was an error when sending a comment:", error);
      }
      setComment("");
      setIsNewData(!isNewData);
    }
  };

  const handleSelectEmoji = (emoji: data.Skin) => {
    const updatedComment = comment + emoji.native;
    setComment(updatedComment);

    const event = {
      target: {
        value: updatedComment,
      },
    };

    handleCommentChange(event as ChangeEvent<HTMLInputElement>);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLButtonElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (idDelete: number) => {
    try {
      await axios.delete(`/api/comment/delete/${idDelete}`);
    } catch (error) {
      console.error("Error during request execution:", error);
    }
    setIsNewData(!isNewData);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function CommentBlock({
    id,
    userId,
    userName,
    commentText,
    creationTime,
    userLogo,
  }: IComment) {
    return (
      <Paper
        elevation={3}
        style={{
          padding: "16px",
          marginBottom: "16px",
          backgroundColor: "rgba(247, 243, 240, 1)",
          borderRadius: "20px",
          width: "80%",
        }}
      >
        <div className="d-flex justify-content-between mb-4">
          <div className="d-flex">
            <Avatar
              src={userLogo ? "/api/files/" + userLogo : ""}
              sx={{ width: 60, height: 70 }}
              variant="rounded"
            />
            <Typography variant="subtitle1" gutterBottom className="fs-5 m-2">
              {userName}
            </Typography>
          </div>

          {(me.role === "ADMIN" || me.id === userId) && (
            <Tooltip className="fs-2" title="Diesen Kommentar löschen">
              <button
                className="fs-4"
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  padding: 0,
                  minWidth: 0,
                  cursor: "pointer",
                  boxShadow: "none",
                  margin: "5px",
                  marginTop: "-5px",
                  color: "grey",
                  opacity: "0.5",
                }}
                onClick={() => {
                  handleDelete(id);
                }}
              >
                ✖️
              </button>
            </Tooltip>
          )}
        </div>
        <Typography
          paragraph
          className="ms-5 fs-5"
          style={{ overflowWrap: "break-word", maxWidth: "30vw" }}
        >
          {commentText}
        </Typography>
        <Divider />
        <Typography variant="caption" color="textSecondary">
          {moment(creationTime).format("D MMMM YYYY | HH:MM")}
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <p className="mt-5 mb-2">Kommentare von Community-Mitgliedern:</p>
      {commentsList && commentsList.length > 0 ? (
        commentsList.map((comment, index) => (
          <CommentBlock key={index} {...comment} />
        ))
      ) : (
        <p
          className="m-2 mb-4 fs-5"
          style={{ color: "gray", fontStyle: "italic" }}
        >
          Bisher keine Kommentare..
        </p>
      )}

      {isPanelShow && (
        <Paper
          elevation={3}
          style={{
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "rgba(247, 243, 240, 1)",
            borderRadius: "10px",
            width: "90%",
          }}
        >
          <TextField
            style={{
              marginRight: "10px",
            }}
            label="Neuer Kommentar"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
          />

          <div className="d-flex justify-content-between">
            <button
              className="button_imker"
              style={{
                marginTop: "10px",
              }}
              onClick={handleAddComment}
            >
              Kommentar hinzufügen
            </button>

            <div>
              <Tooltip className="fs-2" title="Emojis">
                <Button
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClick}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    padding: 0,
                    minWidth: 0,
                    cursor: "pointer",
                    boxShadow: "none",
                  }}
                >
                  😜
                </Button>
              </Tooltip>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Picker
                  data={data}
                  onEmojiSelect={handleSelectEmoji}
                  maxFrequentRows={3}
                  i18n={i18n}
                  set={"native"}
                  skinTonePosition={"none"}
                  dynamicWidth={false}
                  emojiVersion={14}
                />
              </Popover>
            </div>
          </div>
        </Paper>
      )}
    </>
  );
}
