import { useEffect, useState } from "react";
import axios from "axios";
import { IPostDto } from "./interfaces/IPostDTO";
import { IPostsDto } from "../AdminPage/PostsAdmin/interfaces/IPostsDto";
import { Link } from "react-router-dom";

export default function Posts() {
  // const [posts, setPosts] = useState<IPostsDto>(initIPostsDto);
  const [currentPage, setCurrentPage] = useState(1);
  const [arrPages, setArrPages] = useState<IPostDto[][]>([]);
  const [arrPagesNum, setArrPagesNum] = useState<number[]>([]);
  const pages: IPostDto[][] = [];
  const linkToServer = "http://localhost:8080";

  useEffect(() => {
    async function getListOfPosts() {
      try {
        const response = await axios.get(`${linkToServer}/api/posts`);
        const postsData: IPostsDto = await response.data;
        // setPosts(postsData);

        while (postsData.posts.length > 0) {
          pages.push(postsData.posts.splice(0, 6));
        }

        setArrPages(pages);
        setArrPagesNum(
          Array.from({ length: pages.length }, (_, index) => index + 1)
        );
        setCurrentPage(1);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    }
    getListOfPosts();
  }, []);

  return (
    <>
      {arrPagesNum.map((pageNum) => (
        <button
          key={pageNum}
          className={`btn btn-primary ${
            currentPage === pageNum ? "active" : ""
          }`}
          onClick={() => setCurrentPage(pageNum)}
        >
          {pageNum}
        </button>
      ))}

      {true && (
        <div className="container">
          {arrPages[currentPage - 1] &&
            arrPages[currentPage - 1].map(
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
                  <Link to={`/posts/${idPost}`} className="fs-4">{titlePost}</Link>
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
