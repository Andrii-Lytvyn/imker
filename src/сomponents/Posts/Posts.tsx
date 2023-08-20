import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import {
  IPostsDto,
  initIPostsDto,
} from "../AdminPage/PostsAdmin/interfaces/IPostsDto";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";

export default function Posts() {
  const [posts, setPosts] = useState<IPostsDto>(initIPostsDto);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 3;
  const linkToServer = "http://localhost:8080";

  useEffect(() => {
    async function getListOfPosts() {
      try {
        const response = await axios.get(
          `${linkToServer}/api/posts?page=0&items=${itemsOnPage}&orderBy=creationTimePost&desk=true`
        );
        setPosts(response.data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    }
    getListOfPosts();
  }, []);

  const getAnotherPage = async (_: ChangeEvent<unknown>, value: number) => {
    try {
      const response = await axios.get(
        `${linkToServer}/api/posts?page=${
          value - 1
        }&items=${itemsOnPage}&orderBy=creationTimePost&desk=true`
      );
      const postsData: IPostsDto = await response.data;
      setPosts(postsData);
      setCurrentPage(value);
    } catch (error) {
      console.error("Error during request execution:", error);
    }
  };

  return (
    <>
      <Pagination
        count={posts.pages}
        page={currentPage}
        size="large"
        onChange={getAnotherPage}
      />

      {posts && (
        <div className="container">
          {posts.posts.map(
            ({
              idPost,
              creationTimePost,
              titlePost,
              linkToImg,
              shortPostDescription,
              // textOfPost,
              // authorName,
            }) => (
              <div key={idPost}>
                <hr />
                <p>Post id: {idPost}</p>
                <p>Created: {creationTimePost}</p>
                <Link to={`/posts/${idPost}`} className="fs-4">
                  {titlePost}
                </Link>
                <br />
                <img
                  src={linkToServer + "/files/" + linkToImg}
                  alt={"post img" + idPost}
                />
                <div>{shortPostDescription}</div>
                <Link to={`/posts/${idPost}`} className="btn btn-primary">
                  Open this post
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}
