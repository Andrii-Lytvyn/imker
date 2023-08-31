import styles from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

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
              <img src="/logo.png" height="50px" />
            </Link>
          </Nav>
          <Nav
            className={
              styles.linkMenu + " justify-content-between align-items-center"
            }
          >
            <Link to="/posts">Blog</Link>
            <Link to="/events">Veranstaltungen</Link>
            <NavDropdown title="Über uns" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/contactUs">Kontaktieren Sie uns</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/aboutUs">Mitglieder der Gemeinschaft</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Link to="/gallery">Galerie</Link>
            <NavDropdown title="Für test" id="basic-nav-dropdown">
              <NavDropdown.Item>
                {/*
                Сюда вставляем ссылки для тестирования компонентов. Не забываем поменять в App.tsx
                После тестирования, пожалуйста, очистите за собой App.tsx
                */}
                <Link to="/contactusadm">ContactUsAdmin</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/adminpage">AdminPage</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/postsadm">PostsAdmin</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/eventsadm">EventsAdmin</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/filesadm">FilesAdmin</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/teamadmin">TeamAdmin</Link>
              </NavDropdown.Item>              
              <NavDropdown.Item>
                <Link to="/aboutusadmin">AboutUsAdmin</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/galleryadm">GalleryAdmin</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/accountpage">AccountPage</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Link to="/singUp">
              <span>LogIn</span>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
