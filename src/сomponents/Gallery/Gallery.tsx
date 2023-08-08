import styles from './Gallery.module.css'
import {Col, Container, Row} from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';

export default function Gallery(): JSX.Element {

	return (
		<>
			<Container className="mb-5">
				<h1>Unsere Galerie</h1>
				<Row className="d-flex flex-column ml-1 mr-1 row-gap-4 overflow-hidden">
					<Col className="d-flex column-gap-1">
						<img className={styles.img_gallery + " col-4"} src="img/gallery/11.jpg" rounded   />
						<img className={styles.img_gallery + " col-4"} src="img/gallery/22.jpg" rounded   />
						<img className={styles.img_gallery + " col-4"} src="img/gallery/33.jpg" rounded   />
					</Col>
					<Col className="d-flex column-gap-1">
						<img className={styles.img_gallery + " col-4"} src="img/gallery/44.jpg" rounded   />
						<img className={styles.img_gallery + " col-4"} src="img/gallery/55.jpg" rounded   />
						<img className={styles.img_gallery + " col-4"} src="img/gallery/66.jpg" rounded   />
					</Col>
					<Col className="d-flex column-gap-1">
						<img className={styles.img_gallery + " col-4"} src="img/gallery/77.jpg" rounded   />
						<img className={styles.img_gallery + " col-4"} src="img/gallery/88.jpg" rounded   />
						<img className={styles.img_gallery + " col-4"} src="img/gallery/99.jpg" rounded  />
					</Col>
				</Row>
			</Container>
			<Container>
				<div className="d-flex align-items-center justify-content-center mb-5">
					<Pagination>
						<Pagination.First />
						<Pagination.Prev />
						<Pagination.Item>{1}</Pagination.Item>
						<Pagination.Ellipsis />

						<Pagination.Item>{10}</Pagination.Item>
						<Pagination.Item>{11}</Pagination.Item>
						<Pagination.Item active>{12}</Pagination.Item>
						<Pagination.Item>{13}</Pagination.Item>
						<Pagination.Item disabled>{14}</Pagination.Item>

						<Pagination.Ellipsis />
						<Pagination.Item>{20}</Pagination.Item>
						<Pagination.Next />
						<Pagination.Last />
					</Pagination>
				</div>
			</Container>

		</>
	);
}