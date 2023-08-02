import axios from "axios";
import { useEffect, useState } from "react";
import { IPostDto } from "../interfaces/IPostDTO";
import DOMPurify from "dompurify";

export default function PostSingle():JSX.Element {
  const [post, setPost] = useState<IPostDto | undefined>();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/posts/5");
      const postDto = response.data;
      setPost(postDto);
      console.log(postDto);
    } catch (error) {
      console.error("Error during request execution:", error);
    }
  };

  fetchData();
}, []);


  return (
    <>
    <div className="container" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post?.textOfPost || "") }} />
      {/* <div className="container" dangerouslySetInnerHTML={{ __html: post!.textOfPost }} /> */}
    </>
  )
}
