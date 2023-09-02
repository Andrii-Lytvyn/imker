import { useUserSelector } from "../../redux/userStore/userSelector";
import styles from "./Header.module.css";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { logOut } from "../UserLogin/helpers/userAuth/userOperation";
import { useAppDispatch } from "../../hooks/dispatch.selector";
import { userDataInfo } from "../../redux/userStore/userSlice";
import { userData } from "../../redux/userStore/interface/IUserData";
import { NavLink } from "react-router-dom";
// import { ROLE } from "../../statusAndRole/role";

export default function Header(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useUserSelector();

  const handleLogOut = async () => {
    await logOut();
    dispatch(userDataInfo(userData));
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <div className={styles.logo}>
          <Link to="/">
            {" "}
            <img src="./bee2.png" alt="bee" className={styles.logo_img} />
          </Link>
        </div>
        <div className={styles.title}>
          <h2 className={styles.logo_title}>HONEY</h2>
          <span style={{ color: "#fff" }}>Sweet & Healty life </span>
        </div>
      </div>
      {/* ////////////////// */}
      <div className={styles.nav}>
        <ul className={`${styles.nav_list} ${styles.nav_list_line}`}>
          <li className={styles.item}>
            <NavLink to="/posts" className={styles.title_nav}>
              Blog
            </NavLink>
          </li>
          <li className={styles.item}>
            <Link to="/events" className={styles.title_nav}>
              Veranstaltungen
            </Link>
          </li>
          <li className={`${styles.item} ${styles.item_submenu}`}>
            <span className={`${styles.title_nav} ${styles.title_nav_menu}`}>
              Über uns
            </span>
            <div className={styles.submenu}>
              <Link to="/contactUs" className={styles.line}>
                Kontaktieren Sie uns
              </Link>
              <Link to="/aboutUs">Mitglieder der Gemeinschaft</Link>
            </div>
          </li>
          <li className={styles.item}>
            <Link to="/gallery" className={styles.title_nav}>
              Galerie
            </Link>
          </li>
          {/* {user.role === ROLE.ADMIN ? ( */}
          <li className={`${styles.item} ${styles.item_submenu_admin}`}>
            <span className={`${styles.title_nav} ${styles.title_nav_menu}`}>
              fur test
            </span>
            <div className={styles.submenu_admin}>
              <Link to="/contactusadm">ContactUsAdmin</Link>
              <Link to="/adminpage">AdminPage</Link>
              <Link to="/postsadm">PostsAdmin</Link>
              <Link to="/eventsadm">EventsAdmin</Link>
              <Link to="/filesadm">FilesAdmin</Link>
              <Link to="/aboutusadmin">AboutUsAdmin</Link>

              <Link to="/galleryadm">GalleryAdmin</Link>

              <Link to="/accountpage">AccountPage</Link>
              <Link to ="/teamadmin" >TeamAdmin</Link>

            </div>
          </li>
        </ul>

        <div className={styles.account_container}>
          {Object.keys(user).length === 0 ? (
            <div>
              <Link to="/singUp">
                <button type="button" className={styles.nav_login}>
                  Login
                </button>
              </Link>
            </div>
          ) : (
            <div className={styles.account}>
              <span>{user.name}</span>
              <button type="button" onClick={handleLogOut}>
                {" "}
                <LuLogOut />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

    // <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
    //   <Container>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse
    //       id="basic-navbar-nav"
    //       className="justify-content-between"
    //     >
    //       <Nav className={styles.logo}></Nav>
    //       <Nav
    //         className={
    //           styles.linkMenu + " justify-content-between align-items-center"
    //         }
    //       >
    //         <Link to="/posts">Blog</Link>
    //         <Link to="/events">Veranstaltungen</Link>
    //         <NavDropdown title="Über uns" id="basic-nav-dropdown">
    //           <NavDropdown.Item>
    //             <Link to="/contactUs">Kontaktieren Sie uns</Link>
    //           </NavDropdown.Item>
    //           <NavDropdown.Item>
    //             <Link to="/aboutUs">Mitglieder der Gemeinschaft</Link>
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //         <Link to="/gallery">Galerie</Link>
    //         <NavDropdown title="Für test" id="basic-nav-dropdown">
    //           <NavDropdown.Item>
    //             {/*
    //             Сюда вставляем ссылки для тестирования компонентов. Не забываем поменять в App.tsx
    //             После тестирования, пожалуйста, очистите за собой App.tsx
    //             */}
    //             <Link to="/contactusadm">ContactUsAdmin</Link>
    //           </NavDropdown.Item>
    //           <NavDropdown.Item>
    //             <Link to="/adminpage">AdminPage</Link>
    //           </NavDropdown.Item>
    //           <NavDropdown.Item>
    //             <Link to="/postsadm">PostsAdmin</Link>
    //           </NavDropdown.Item>
    //           <NavDropdown.Item>
    //             <Link to="/eventsadm">EventsAdmin</Link>
    //           </NavDropdown.Item>
    //           <NavDropdown.Item>
    //             <Link to="/filesadm">FilesAdmin</Link>
    //           </NavDropdown.Item>
    //           <NavDropdown.Item>
    //             <Link to="/aboutusadmin">AboutUsAdmin</Link>
    //           </NavDropdown.Item>
    //           <NavDropdown.Item>
    //             <Link to="/galleryadm">GalleryAdmin</Link>
    //           </NavDropdown.Item>
    //           <NavDropdown.Item>
    //             <Link to="/accountpage">AccountPage</Link>
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //         <Link to="/singUp">
    //           <span>LogIn</span>
    //         </Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
}
