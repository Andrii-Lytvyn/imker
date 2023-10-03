import axios from "axios";
import { useEffect, useState } from "react";
import { IPostDto, initIPostDto } from "../interfaces/IPostDTO";
import DOMPurify from "dompurify";
import { Link, useParams } from "react-router-dom";
import styles from "./Post.module.css";
import { FaHome } from "react-icons/fa";
import { Container, Nav } from "react-bootstrap";
import moment from "moment";
import PostPanelRightSide from "../PostPanelRightSide/PostPanelRightSide";
import CommentPanel from "../../CommentsPanel/CommentsPanel";
import imgNotFound from "/img/imgNotFound.jpg";

export default function PostSingle(): JSX.Element {
  const [
    { idPost, creationTimePost, titlePost, linkToImg, textOfPost, authorName },
    setPost,
  ] = useState<IPostDto>(initIPostDto);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`, {
          withCredentials: true,
        });
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
      <div className={styles.post_main}>
        <Container>
          <div className={styles.breadcrumbs}>
            <Nav>
              <Link to="/imker">
                {" "}
                <FaHome />
              </Link>
            </Nav>
            <span> | </span>
            <Nav>
              <Link to="/posts">POSTS</Link>
            </Nav>
            <span> | </span>
            {titlePost}
          </div>
          <hr />
          <div className={styles.post_cont}>
            <div className={styles.single_post + " container"}>
              <img
                className={styles.post_img}
                src={"https://imker.fra1.digitaloceanspaces.com/" + linkToImg}
                alt={"post img" + idPost}
                onContextMenu={(e) => e.preventDefault()}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = imgNotFound;
                }}
              />
              <p className={styles.post_time}>
                {moment(creationTimePost).format("D MMMM YYYY")}
              </p>
              <h2 className={styles.main_post_title}>{titlePost}</h2>
              <div
                className="container"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(textOfPost || ""),
                }}
              />
              <div className={styles.post_author}>
                <p>
                  <span>{authorName}</span>
                </p>
              </div>
              <CommentPanel location={{ entity: "post", entityId: id }} />

            </div>

            <div className={styles.post_right_side}>
              <PostPanelRightSide />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
