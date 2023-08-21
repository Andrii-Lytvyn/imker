import React, { useState } from 'react';

export default function FilesUpload(): JSX.Element {
  const [imageData, setImageData] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleFileUploading(){
    if (imageData && selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('http://localhost:8080/files/upload?width=300&height=300', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('File uploaded:', data.id);
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
    }}
 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setImageData(url);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <button onClick={() => handleFileUploading()}>Send File</button>}
      <br />
      {imageData && <img src={imageData} alt="Image" />}
    </div>
  );
}
