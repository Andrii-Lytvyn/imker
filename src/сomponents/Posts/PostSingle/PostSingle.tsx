import axios from "axios";
import { useEffect, useState } from "react";
import { IPostDto } from "../interfaces/IPostDTO";
import DOMPurify from "dompurify";
import Header from "../../Header/Header";

export default function PostSingle(): JSX.Element {
  const [post, setPost] = useState<IPostDto | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/posts/24");
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
      <Header />
      <div className="container">
        <p>{post?.creationTimePost}</p>
        <p>{post?.titlePost}</p>
        <img src={post?.linkToImg} alt="imgPost" />
        <p>{post?.shortPostDescription}</p>
      </div>
      <div
        className="container"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post?.textOfPost || ""),
        }}
      />
      {/* <div className="container" dangerouslySetInnerHTML={{ __html: post!.textOfPost }} /> */}
    </>
  );
}
