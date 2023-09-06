import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Divider } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

interface IComment {
  id: number;
  creationTime: string;
  commentText: string;
  userId: number;
  userName: string;
  userLogo: string;
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
      }}
    > 
      <div className="d-flex mb-4">
        <Avatar src={userLogo? ("/api/files/" + userLogo) : ""} sx={{ width: 50, height: 50 }} />
        <Typography variant="subtitle1" gutterBottom className="fs-5 m-2">
          {userName}
        </Typography>
      </div>
      <Typography paragraph className="ms-5">
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
  
  const [commentsList, setCommentsList] = useState<IComment[]>();
  
  useEffect(() => {
    async function getListOfComments() {
      try {
        const response = await axios.get(`/api/comment/${entity}?id=${entityId}`);
        setCommentsList(response.data.commentsList);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    }
    getListOfComments();
  }, [entity, entityId]);

  return (
    <>
        {commentsList ? (
          commentsList.map((comment, index) => (
            <CommentBlock key={index} {...comment} />
          ))
        ) : (
          <p>Loading comments...</p>
        )}
    </>
  );
}
