import styles from "./Posts.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import {
  IPostsDto,
  initIPostsDto,
} from "../AdminPage/PostsAdmin/interfaces/IPostsDto";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { Container } from "react-bootstrap";
import moment from "moment";
import PostPanelRightSide from "./PostPanelRightSide/PostPanelRightSide";

export default function Posts() {
  const [posts, setPosts] = useState<IPostsDto>(initIPostsDto);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 3;

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <div className={styles.posts_main}>
        <div
          className={
            styles.post_bg +
            " d-flex align-items-center justify-content-center animate__animated animate__fadeInDown"
          }
        >
          <h2 className="container animate__animated animate__fadeInUp">
            BLOG
          </h2>
        </div>
        <Container>
          <div className={styles.post_container}>
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
                    authorName,
                  }) => (
                    <div key={idPost}>
                      <br />
                      <img
                        className={styles.post_img}
                        src={`https://imker.fra1.cdn.digitaloceanspaces.com/${linkToImg}`}
                        alt={"post img" + idPost}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/img/imgNotFound.jpg";
                        }}
                      />
                      <p className={styles.post_event_date}>
                        {moment(creationTimePost).format("D MMMM YYYY")}
                      </p>
                      {authorName && (
                        <p className={styles.post_event_date}>
                          {" "}
                          | Name des Autors:
                          <span className={styles.post_span_author}>
                            {authorName}
                          </span>
                        </p>
                      )}
                      <div className={styles.post_clear}>
                        <h2 className={styles.post_h2}>
                          <Link to={`/posts/${idPost}`} className="fs-4">
                            {titlePost}
                          </Link>
                        </h2>
                      </div>
                      <div className={styles.post_event_text_temp}>
                        {shortPostDescription}
                      </div>
                      <div className={styles.post_event_text_button}>
                        <Link to={`/posts/${idPost}`} className="button_imker">
                          Mehr lesen
                        </Link>
                      </div>
                      <hr />
                    </div>
                  )
                )}
              </div>
            )}
            <PostPanelRightSide />
          </div>
          <Pagination
            className={styles.pagination_container}
            count={posts.pages}
            page={currentPage}
            size="large"
            onChange={getAnotherPage}
          />
        </Container>
      </div>
    </>
  );
}
