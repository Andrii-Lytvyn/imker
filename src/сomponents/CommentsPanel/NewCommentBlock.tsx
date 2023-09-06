import { ChangeEvent, useState } from "react";
import { Paper, TextField } from "@mui/material";

export default function NewCommentBlock() {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    
    console.log("Добавлен комментарий:", comment);
    setComment("");
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "rgba(247, 243, 240, 1)",
      }}
    >
      <TextField
        style={{
          marginRight: "10px",
        }}
        label="Новый комментарий"
        variant="outlined"
        fullWidth
        value={comment}
        onChange={handleCommentChange}
      />
      {/* <Button
        className="button_imker"
        variant="contained"
        color="primary"
        style={{
          marginTop: "10px",
        }}
        onClick={handleAddComment}
      >
        Добавить комментарий
      </Button> */}
      <button 
      className="button_imker"
      style={{
        marginTop: "10px",
      }}
      onClick={handleAddComment}
      >
      Добавить комментарий
      </button>
    </Paper>
  );
}
