import { useState } from "react";
import { IPostDto } from "../../Posts/interfaces/IPostDTO";
import axios from "axios";
import PostEditAdmin from "./PostEditAdmin";

export default function PostsListAdmin() {
  const [post, setPost] = useState<IPostDto>();
  const [isDataLoad, setIsDataLoad] = useState<boolean>(false);

  async function handleLoadData() {
    try {
      const response = await axios.get("http://localhost:8080/api/posts/5");
      setPost(await response.data);
      setIsDataLoad(true);
    } catch (error) {
      console.error("Error during request execution:", error);
    }
  }

  const handleGoEdit = () => {
    handleLoadData();
  };

  return (
    <>
      <button onClick={handleGoEdit}>Загрузить данные</button>
      {isDataLoad&& <PostEditAdmin location={{ state: post! }} />}
    </>
  );
}
