import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import { IPostsDto, initIPostsDto } from "./interfaces/IPostsDto";
import { IPostDto } from "../../Posts/interfaces/IPostDTO";
import PostEditAdmin from "./PostEditAdmin";
import PostsCreationAdmin from "./PostsCreationAdmin";
import styles from "./PostAdmin.module.css";

export default function PostsAdmin() {
  const [{ posts, count, pages }, setPosts] =
    useState<IPostsDto>(initIPostsDto);
  const [post, setPost] = useState<IPostDto>();
  const [isEditShow, setIsEditShow] = useState<boolean>(false);
  const [isCreateShow, setIsCreateShow] = useState<boolean>(false);
  const [isListShow, setIsListShow] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 5;

  useEffect(() => {
    async function getListOfPosts() {
      try {
        const response = await axios.get(
          `/api/posts?page=0&items=${itemsOnPage}&orderBy=creationTimePost&desk=true`,
          {
            withCredentials: true,
          }
        );
        setPosts(response.data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    }
    getListOfPosts();
  }, []);

  async function handleLoadData(idPost: number) {
    try {
      const response = await axios.get(`/api/posts/${idPost}`, {
        withCredentials: true,
      });
      setPost(await response.data);
      setIsLoaded(true);
      setIsEditShow(true);
      setIsListShow(false);
      setIsCreateShow(false);
    } catch (error) {
      console.error("Error during request execution:", error);
    }
  }

  const getAnotherPage = async (_: ChangeEvent<unknown>, value: number) => {
    try {
      const response = await axios.get(
        `/api/posts?page=${
          value - 1
        }&items=${itemsOnPage}&orderBy=creationTimePost&desk=true`,
        {
          withCredentials: true,
        }
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
      {/* <div className={styles.bgndPost}></div> */}

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

          <Pagination
            count={pages}
            page={currentPage}
            size="large"
            onChange={getAnotherPage}
          />

          {posts.map(
            ({
              idPost,
              creationTimePost,
              titlePost,
              linkToImg,
              shortPostDescription,
              authorName,
              // textOfPost,
            }) => (
              <div key={idPost} className={styles.postContainer}>
                <p className={styles.postData}>Post id: {idPost}</p>
                <p className={styles.postData}>Image id: {linkToImg}</p>
                {authorName && (
                  <p className={styles.postData}>Author name: {authorName}</p>
                )}
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
          <Pagination
            count={pages}
            page={currentPage}
            size="large"
            onChange={getAnotherPage}
          />
        </div>
      )}
    </>
  );
}
