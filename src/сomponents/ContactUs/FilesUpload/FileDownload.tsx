import { useState, useEffect } from 'react';

export default function FilesDownload():JSX.Element {
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/files/3')
      .then(response => response.blob())
      .then(blobData => {
        const url = URL.createObjectURL(blobData);
        setImageData(url);
        console.log(url);
      });
  }, []);

  return (
    <div>
      {imageData && <img src={imageData} alt="Image" />}
    </div>
  );
}
