import { useEffect, useState } from "react";
import axios from "axios";
import {
  IPostsDto,
  initIPostsDto,
} from "../../AdminPage/PostsAdmin/interfaces/IPostsDto";
import { Link } from "react-router-dom";
import linkToServer from "../../globalLinkToServer";

export default function PostsPanel() {
  const [posts, setPosts] = useState<IPostsDto>(initIPostsDto);
  const itemsOnPage = 6;

  useEffect(() => {
    async function getListOfPosts() {
      try {
        const response = await axios.get(
          `${linkToServer}/api/posts?page=0&items=${itemsOnPage}&orderBy=creationTimePost&desk=true`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    }
    getListOfPosts();
  }, []);

  return (
    <>
      {posts && (
        <div className="container">
          {posts.posts.map(
            ({
              idPost,
              creationTimePost,
              titlePost,
              // linkToImg,
              shortPostDescription,
              // textOfPost,
              authorName,
            }) => (
              <div key={idPost}>
                <hr />
                <p>Post id: {idPost}</p>
                <p>Created: {creationTimePost}</p>
                {authorName && <p>Author name: {authorName}</p>}
                <Link to={`/posts/${idPost}`} className="fs-4">
                  {titlePost}
                </Link>
                <br />
                {/* <img
                  src={linkToServer + "/api/files/" + linkToImg}
                  alt={"post img" + idPost}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/img/imgNotFound.png";
                  }}
                /> */}
                <div>{shortPostDescription}</div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}
