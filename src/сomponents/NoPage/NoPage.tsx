import styles from './NoPage.module.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function NoPage(): JSX.Element {
	return (
		<>
			<Header />
			<div className={styles.noPage}>
				<h1>Das ist 404</h1>
			</div>
			<Footer />
		</>
	);
}