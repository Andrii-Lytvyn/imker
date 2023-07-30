import styles from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header(): JSX.Element {
  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className={styles.logo}>
            <Link to="/">
              <span>LOGO</span>
            </Link>
          </Nav>
          <Nav className="d-flex justify-content-evenly">
            <Link to="/">
              <img src="/img/flags/en_50.png" width="50%" />
            </Link>
            <Link to="/">
              <img src="/img/flags/de_50.png" width="50%" />
            </Link>
          </Nav>
          <Nav
            className={
              styles.linkMenu + " justify-content-between align-items-center"
            }
          >
            <Link to="/">Pages</Link>
            <Link to="/">Products</Link>
            <Link to="/">Blog</Link>
            <Link to="/">Gallery</Link>
            <Link to="/contactus">Contact Us</Link>
            <Link to="/contactusadm">Contact Us Adm</Link>
            <Link to="/404">Page 404</Link>
            <Link to="/login">
              <span>LogIn</span>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
