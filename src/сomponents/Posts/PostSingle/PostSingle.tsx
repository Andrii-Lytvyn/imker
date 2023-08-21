import axios from "axios";
import { useEffect, useState } from "react";
import { IPostDto } from "../interfaces/IPostDTO";
import DOMPurify from "dompurify";

import { useParams } from "react-router-dom";


export default function PostSingle(): JSX.Element {
  const [post, setPost] = useState<IPostDto | undefined>();
  const { id } = useParams();
  const linkToServer = "http://localhost:8080";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${linkToServer}/api/posts/${id}`);
        const postDto = response.data;
        setPost(postDto);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="container">
        <p>{post?.creationTimePost}</p>
        <p>{post?.titlePost}</p>
        <img
                    src={linkToServer + "/files/" + post?.linkToImg}
                    alt={"post img" + post?.idPost}
                  />
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
