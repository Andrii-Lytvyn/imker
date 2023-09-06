import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/dispatch.selector";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import TabletMobile from "./TabletMobile/TabletMobile";
import { useUserSelector } from "../../redux/userStore/userSelector";
import { logOut } from "../UserLogin/helpers/userAuth/userOperation";
import { userDataInfo } from "../../redux/userStore/userSlice";
import { userData } from "../../redux/userStore/interface/IUserData";
import AccountMenu from "./AccountMenu";
import { ROLE } from "../../statusAndRole/role";
import logoBee from "/img/bee2.png"

export default function Header(): JSX.Element {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 950);
  const { user, isLogin } = useUserSelector();

  useEffect(() => {
    function handleResize() {
      setIsWideScreen(window.innerWidth > 950);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogOut = async () => {
    await logOut();
    dispatch(userDataInfo(userData));
    window.location.href = "/";
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <div className={styles.logo}>
          <Link to="/">
            {" "}
            <img src={logoBee} alt="bee" className={styles.logo_img} />
          </Link>
        </div>
        <div className={styles.title}>
          <h2 className={styles.logo_title}>HONEY</h2>
          <span className={styles.logo_slogan}>Sweet & Healhty life </span>
        </div>
      </div>
      {/* ////////////////// */}
      <div className={`${styles.nav} ${styles.nav_with}`}>
        {isWideScreen ? (
          <ul className={styles.nav_list}>
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
              <Link to="/aboutUs" className={styles.title_nav}>
                Über uns
              </Link>
              {/* <span className={`${styles.title_nav} ${styles.title_nav_menu}`}> */}
              {/* Über uns
              </span> */}
              {/* <div className={styles.submenu}>
                <Link to="/contactUs" className={styles.line}>
                  Kontaktieren Sie uns
                </Link>
                <Link to="/aboutUs">Mitglieder der Gemeinschaft</Link>
              </div> */}
            </li>
            <li className={styles.item}>
              <Link to="/gallery" className={styles.title_nav}>
                Galerie
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/contactUs" className={styles.title_nav}>
                Kontakt
              </Link>
            </li>
            {user.role === ROLE.ADMIN ? (
            <li className={`${styles.item} ${styles.item_submenu_admin}`}>
              <Link to="/adminpage" className={styles.title_nav}>
                Admin
              </Link>
            </li>
             ) : (
              ""
            )} 
          </ul>
        ) : (
          <div>
            <TabletMobile />
          </div>
        )}

        <div className={styles.account_container}>
          {!isLogin ? (
            <div>
              <Link to="/singUp">
                <button
                  type="button"
                  className={`${styles.nav_login} button_imker`}
                >
                  Login
                </button>
              </Link>
            </div>
          ) : (
            <div className={styles.account}>
              <div className={styles.account_name_avatar}>
                <AccountMenu userImg={user?.image} userLogOut={handleLogOut} />
                <span>{user.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
