import styles from './Gallery.module.css'
import {Col, Container, Row} from "react-bootstrap";

export default function Gallery(): JSX.Element {
	return (

			<Container>
				<Row>
					<Col className="d-flex">
						<img src="img/logo.png" rounded fluid  />
						<img src="img/logo.png" rounded fluid  />
						<img src="img/logo.png" rounded fluid  />
					</Col>
				</Row>
			</Container>
	);
}