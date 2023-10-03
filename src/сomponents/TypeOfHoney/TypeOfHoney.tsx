import styles from "./TypeOfHoney.module.css";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import tile1 from "/img/tile/tile_1.png";
import tile2 from "/img/tile/tile_2.png";
import tile3 from "/img/tile/tile_3.png";
import tile4 from "/img/tile/tile_4.png";
import flower from "/img/body_left.png";

export default function TypeOfHoney(): JSX.Element {
    return (
        <>
            <div className={styles.type_main_container}>
                <div className={styles.tile_background}>
                    <img src={flower}/>
                </div>
                <Container>
                    <h2 className={styles.main_honey_title}>HONIGSORTEN</h2>
                    <h4>Erfahren Sie mehr über einige der Produkte, auf die wir besonders stolz sind.</h4>
                    <Row>
                        <Col>
                            <Link to="posts/9">
                            <div className={styles.tile_main + " animate__animated animate__fadeInUp"}>
                                <div className={styles.tile_img}>
                                    <img src={tile1}/>
                                </div>
                                <div className={styles.tile_texts}>
                                    <div className={styles.tile_title}>
                                        <p>Honig aus dem Wald</p>
                                    </div>
                                    <div className={styles.tile_text}>
                                        <p>Waldhonig ist sehr gesund. Ugo sollte verwendet werden, wenn Sie Kopfschmerzen haben</p>
                                    </div>
                                    <div className={styles.tile_link}>
                                        <p>
                                            Mehr lesen
                                        </p>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </Col>
                        <Col>
                            <Link to="posts/9">
                            <div className={styles.tile_main + " animate__animated animate__fadeInUp"}>
                                <div className={styles.tile_img}>
                                    <img src={tile2}/>
                                </div>
                                <div className={styles.tile_texts}>
                                    <div className={styles.tile_title}>
                                        <p>Natürlicher Honig</p>
                                    </div>
                                    <div className={styles.tile_text}>
                                        <p>Waldhonig ist sehr gesund. Ugo sollte verwendet werden, wenn Sie Kopfschmerzen haben</p>
                                    </div>
                                    <div className={styles.tile_link}>
                                        <p>
                                           Mehr lesen
                                        </p>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to="posts/9">
                            <div className={styles.tile_main + " animate__animated animate__fadeInUp"}>
                                <div className={styles.tile_img}>
                                    <img src={tile3}/>
                                </div>
                                <div className={styles.tile_texts}>
                                    <div className={styles.tile_title}>
                                        <p>Gesunder Honig</p>
                                    </div>
                                    <div className={styles.tile_text}>
                                        <p>Waldhonig ist sehr gesund. Ugo sollte verwendet werden, wenn Sie Kopfschmerzen haben</p>
                                    </div>
                                    <div className={styles.tile_link}>
                                        <p>
                                            Mehr lesen
                                        </p>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </Col>
                        <Col>
                            <Link to="posts/9">
                            <div className={styles.tile_main + " animate__animated animate__fadeInUp"}>
                                <div className={styles.tile_img}>
                                    <img src={tile4}/>
                                </div>
                                <div className={styles.tile_texts}>
                                    <div className={styles.tile_title}>
                                        <p>Organischer Honig</p>
                                    </div>
                                    <div className={styles.tile_text}>
                                        <p>Waldhonig ist sehr gesund. Ugo sollte verwendet werden, wenn Sie Kopfschmerzen haben</p>
                                    </div>
                                    <div className={styles.tile_link}>
                                        <p>
                                           Mehr lesen
                                        </p>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
