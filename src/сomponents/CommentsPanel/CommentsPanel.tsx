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
import { EmojiData } from "emoji-mart";

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

function CommentBlock({
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
      <div className="d-flex mb-4">
        <Avatar
          src={userLogo ? "/api/files/" + userLogo : ""}
          sx={{ width: 50, height: 50 }}
        />
        <Typography variant="subtitle1" gutterBottom className="fs-5 m-2">
          {userName}
        </Typography>
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

  useEffect(() => {
    async function getListOfComments() {
      try {
        const response = await axios.get(
          `/api/comment/${entity}?id=${entityId}`
        );
        setCommentsList(response.data.commentsList);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    }
    getListOfComments();
  }, [entity, entityId, isNewData]);

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (text.length <= maxCharacterCount) {
      const newCommentData =
        entity === "event"
          ? {
              commentText: e.target.value,
              userId: 1,
              eventId: Number(entityId),
              postId: 0,
            }
          : {
              commentText: e.target.value,
              userId: 1,
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
      console.log(newComment);
    }
  };

  const handleSelectEmoji = (emoji: EmojiData) => {
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <p className="m-2">Kommentare von Community-Mitgliedern:</p>
      {commentsList && commentsList.length > 0 ? (
        commentsList.map((comment, index) => (
          <CommentBlock key={index} {...comment} />
        ))
      ) : (
        <p className="m-2 mb-4 fs-4">Bisher keine Kommentare..</p>
      )}
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
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Picker data={data} onEmojiSelect={handleSelectEmoji} />
          </Popover>
        </div>

        </div>

      </Paper>
    </>
  );
}
