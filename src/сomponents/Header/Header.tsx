import styles from './Header.module.css'
import {Link} from "react-router-dom";

export default function Header(): JSX.Element {
	return (
		<>
			<div className={styles.header}>
				<h1>Das ist HEADER</h1>
				<ul className="d-flex justify-content-around">
					<li>
						<Link to="/imker" >MAIN</Link>
					</li>
					<li>
						<Link to="/imker/login" >LOGIN</Link>
					</li>
					<li>
						<Link to="/imker/contact" >CONTACT</Link>
					</li>
					<li>
						<Link to="/imker/about" >ABOUT</Link>
					</li>
				</ul>
			</div>
		</>
	);
}
