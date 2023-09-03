import { useUserSelector } from "../../redux/userStore/userSelector";
import styles from "./Header.module.css";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { logOut } from "../UserLogin/helpers/userAuth/userOperation";
import { useAppDispatch } from "../../hooks/dispatch.selector";
import { userDataInfo } from "../../redux/userStore/userSlice";
import { userData } from "../../redux/userStore/interface/IUserData";
import { NavLink } from "react-router-dom";
// import { ROLE } from "../../statusAndRole/role";
import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import { IUserAccountInfo, initIUserAccountInfo } from "../AccountPage/interfaces/IUserAccountInfo";
import axios from "axios";
// import { AbsoluteCenter } from "@chakra-ui/layout";
// import { position } from "@chakra-ui/styled-system";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function Header(): JSX.Element {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useUserSelector();
  const [userInfo, setUserInfo] = useState<IUserAccountInfo | undefined>(
    initIUserAccountInfo
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/me`, {
          withCredentials: true,
        });
        const userDto = response.data;
        setUserInfo(userDto);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogOut = async () => {
    await logOut();
    dispatch(userDataInfo(userData));
    // navigate("/");
    window.location.href = '/';
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <div className={styles.logo}>
          <Link to="/">
            {" "}
            <img src="img/bee2.png" alt="bee" className={styles.logo_img} />
          </Link>
        </div>
        <div className={styles.title}>
          <h2 className={styles.logo_title}>HONEY</h2>
          <span style={{ color: "#fff" }}>Sweet & Healhty life </span>
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
              <Link to="/adminpage">AdminPage</Link>
              {/* <Link to="/contactusadm">ContactUsAdmin</Link>
              <Link to="/postsadm">PostsAdmin</Link>
              <Link to="/eventsadm">EventsAdmin</Link>
              <Link to="/filesadm">FilesAdmin</Link>
              <Link to="/aboutusadmin">AboutUsAdmin</Link>
              <Link to="/galleryadm">GalleryAdmin</Link> */}
              <Link to="/accountpage">AccountPage</Link>

              <Link to="/usersadm">UsersAdmin</Link>

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
      {userInfo?.id!=-1 && (
            <div style={{
              position: 'absolute',
              top: '22px',
              right: '370px',
              filter: 'drop-shadow(2px 2px 5px #f2bd41)',
            }}>
              <Link to="/accountpage">
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt={user?.name}
                  variant="rounded"
                  src={"/api/files/" + userInfo?.image}
                  sx={{ width: 100, height: 100}}
                />
              </StyledBadge></Link>
            </div>
          )}
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
