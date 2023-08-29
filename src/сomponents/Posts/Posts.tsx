import styles from "./Posts.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import {
  IPostsDto,
  initIPostsDto,
} from "../AdminPage/PostsAdmin/interfaces/IPostsDto";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import {Container} from "react-bootstrap";
import {BsCalendar2Week} from "react-icons/bs";
import {BiTimeFive} from "react-icons/bi";
import linkToServer from "../globalLinkToServer";

export default function Posts() {
  const [posts, setPosts] = useState<IPostsDto>(initIPostsDto);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 3;

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
      <div className={styles.post_bg + " d-flex align-items-center justify-content-center"}>
        <h2>BLOG</h2>
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
                  src={linkToServer + "/api/files/" + linkToImg}
                  alt={"post img" + idPost}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/img/imgNotFound.jpg";
                  }}
                />
                <p className={styles.post_event_date}>Created: {creationTimePost}</p>
                {authorName && (
                    <p className={styles.post_event_date}>Author name:
                      <Link to={"/"}> {authorName}</Link>
                    </p>
                )}
                <h2>
                  <Link to={`/posts/${idPost}`} className="fs-4">
                    {titlePost}
                  </Link>
                </h2>
                {/*<p>Post id: {idPost}</p>*/}

                <div className={styles.post_event_text_temp}>{shortPostDescription}</div>
                <Link to={`/posts/${idPost}`} className="button_imker">
                  Mehr lesen
                </Link>
                <hr />
              </div>
            )
          )}

        </div>
      )}
          <div className={styles.post_right_side}>
            <h2>NACHRICHTEN</h2>
            <hr className={styles.post_hr} />
            <div className="mb-2">
              <p className={styles.post_event_date}><BsCalendar2Week /> 15 November, 2023</p>
              <p className={styles.post_event_time}><BiTimeFive /> 10:00</p>
              <h4 className={styles.post_event_h4}><Link to={"/"} >SWEET HONEY PACKS FRESH RAW AND UNFILTERED</Link></h4>
              <p className={styles.post_event_text}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>
              <hr className={styles.post_hr} />
            </div>
            <div className="mb-2">
              <p className={styles.post_event_date}><BsCalendar2Week /> 15 November, 2023</p>
              <p className={styles.post_event_time}><BiTimeFive /> 10:00</p>
              <h4 className={styles.post_event_h4}><Link to={"/"} >SWEET HONEY PACKS FRESH RAW AND UNFILTERED</Link></h4>
              <p className={styles.post_event_text}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>
              <hr className={styles.post_hr} />
            </div>
            <div className="mb-2">
              <p className={styles.post_event_date}><BsCalendar2Week /> 15 November, 2023</p>
              <p className={styles.post_event_time}><BiTimeFive /> 10:00</p>
              <h4 className={styles.post_event_h4}><Link to={"/"} >SWEET HONEY PACKS FRESH RAW AND UNFILTERED</Link></h4>
              <p className={styles.post_event_text}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>
              <hr className={styles.post_hr} />
            </div>
          </div>
        </div>
      <Pagination
          className={styles.pagination_container}
          count={posts.pages}
          page={currentPage}
          size="large"
          onChange={getAnotherPage}
      />

      </Container>
    </>
  );
}
