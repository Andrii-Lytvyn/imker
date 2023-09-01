import axios from "axios";
import { useEffect, useState } from "react";
import { IPostDto, initIPostDto } from "../interfaces/IPostDTO";
import DOMPurify from "dompurify";
import { Link, useParams } from "react-router-dom";
import styles from "./Post.module.css";
import { FaHome } from "react-icons/fa";
import { Container, Nav } from "react-bootstrap";
import { BsCalendar2Week } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import linkToServer from "../../globalLinkToServer";
import moment from "moment";

export default function PostSingle(): JSX.Element {
  const [
    {
      idPost,
      creationTimePost,
      titlePost,
      linkToImg,
      textOfPost,
      authorName,
    },
    setPost,
  ] = useState<IPostDto>(initIPostDto);
  const { id } = useParams();

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
        <Container>
            <div className={styles.breadcrumbs}>
                <Nav>
                    <Link to="/">
                        {" "}
                        <FaHome />
                    </Link>
                </Nav>
                <span> | </span>
                <Nav>
                    <Link to="/posts">POSTS</Link>
                </Nav>
                <span> | </span>
                {post?.titlePost}
            </div>
            <hr />
            <div className={styles.post_cont}>
                <div className= {styles.single_post + " container"}>
                <img
                    className={styles.post_img}
                    src={linkToServer + "/api/files/" + post?.linkToImg}
                    alt={"post img" + post?.idPost}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/img/imgNotFound.jpg";
                    }}
                  />
                    <p className={styles.post_time}>{moment(creationTimePost).format("D MMMM YYYY")}</p>
                    <h2>{post?.titlePost}</h2>
                    <div
                className="container"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post?.textOfPost || ""),
                }}
              />
              {/* <div className="container" dangerouslySetInnerHTML={{ __html: post!.textOfPost }} /> */}
                    <div className={styles.post_author}>
                        <p><span>{post?.authorName}</span></p>
                    </div>
                </div>


                <div className={styles.post_right_side}>
                    <h2>VERANSTALTUNGEN</h2>
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
          </div>
        </div>
      </Container>
    </>
  );
}
