import { useEffect, useState } from "react";
import axios from "axios";
import { IPostsDto, initIPostsDto } from "./interfaces/IPostsDto";
import { IPostDto } from "../../Posts/interfaces/IPostDTO";
import PostEditAdmin from "./PostEditAdmin";
import PostsCreationAdmin from "./PostsCreationAdmin";
import styles from "./PostAdmin.module.css";

export default function PostsAdmin() {
  const [{ posts, count }, setPosts] = useState<IPostsDto>(initIPostsDto);
  const [post, setPost] = useState<IPostDto>();
  const [isEditShow, setIsEditShow] = useState<boolean>(false);
  const [isCreateShow, setIsCreateShow] = useState<boolean>(false);
  const [isListShow, setIsListShow] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function getListOfPosts() {
      try {
        const response = await axios.get("http://localhost:8080/api/posts");
        setPosts(await response.data);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    }
    getListOfPosts();
  }, []);

  async function handleLoadData(idPost: number) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/posts/${idPost}`
      );
      setPost(await response.data);
      setIsLoaded(true);
      setIsEditShow(true);
      setIsListShow(false);
      setIsCreateShow(false);
    } catch (error) {
      console.error("Error during request execution:", error);
    }
  }

  return (
    <>
      <div className={styles.bgndPost}></div>

      <div className={styles.headerContainer}>
        <button
          className={isListShow ? styles.headBtnActive : styles.headBtn}
          onClick={() => {
            setIsEditShow(false);
            setIsListShow(true);
            setIsCreateShow(false);
          }}
        >
          View list of Posts
        </button>
        <button
          className={isCreateShow ? styles.headBtnActive : styles.headBtn}
          onClick={() => {
            setIsEditShow(false);
            setIsListShow(false);
            setIsCreateShow(true);
          }}
        >
          Create new post
        </button>
        <button
          className={isEditShow ? styles.headBtnActive : styles.headBtn}
          onClick={() => {
            setIsEditShow(true);
            setIsListShow(false);
            setIsCreateShow(false);
          }}
          disabled={isLoaded ? false : true}
        >
          Edit Post
        </button>
        <hr />
      </div>

      {isCreateShow && <PostsCreationAdmin />}

      {isEditShow && <PostEditAdmin location={{ state: post! }} />}

      {isListShow && (
        <div className={styles.container}>
          <p className={styles.totalCount}>Total count of posts: {count}</p>
          {posts.map(
            ({
              idPost,
              creationTimePost,
              titlePost,
              // linkToImg,
              shortPostDescription,
              // textOfPost,
              // authorId,
            }) => (
              <div key={idPost} className={styles.postContainer}>
                <p className={styles.postData}>Post id: {idPost}</p>
                <p className={styles.postCreated}>
                  Created: {creationTimePost}
                </p>
                <hr />
                <div className={styles.titlePost}>{titlePost}</div>
                <div className={styles.descriptionPost}>
                  {shortPostDescription}
                </div>
                <button
                  className={styles.editBtn}
                  onClick={() => handleLoadData(+idPost)}
                >
                  Edit this post
                </button>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}
