import { ChangeEvent, useState } from 'react';
import { Paper, TextField, Button } from '@mui/material';

export default function NewCommentBlock() {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    // Здесь вы можете выполнить логику добавления комментария
    // Например, отправить комментарий на сервер
    console.log('Добавлен комментарий:', comment);
    // Очистите поле ввода после добавления комментария
    setComment('');
  };

  return (
    <Paper elevation={3} 
    style={{
      padding: '10px',
      marginBottom: '10px',
      backgroundColor: 'rgba(247, 243, 240, 1)',
    }}>
      <TextField
        style={{
          marginRight: '10px',
        }}
        label="Новый комментарий"
        variant="outlined"
        fullWidth
        value={comment}
        onChange={handleCommentChange}
      />
      <Button
        variant="contained"
        color="primary"
        style={{
          marginTop: '10px',
        }}
        onClick={handleAddComment}
      >
        Добавить комментарий
      </Button>
    </Paper>
  );
}
