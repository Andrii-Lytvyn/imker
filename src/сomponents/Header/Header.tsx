import styles from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import {NavDropdown} from "react-bootstrap";

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
          <Nav
            className={
              styles.linkMenu + " justify-content-between align-items-center"
            }
          >
            <Link to="/posts">Blog</Link>
            <Link to="/events">Veranstaltungen</Link>
            <NavDropdown title="Über uns" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/contactUs">Kontakt</Link>
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
                <Link to="/contacts">Test link</Link>

              </NavDropdown.Item>
            </NavDropdown>
            <Link to="/login">
              <span>LogIn</span>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
