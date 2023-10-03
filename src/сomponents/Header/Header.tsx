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
import logoBee from "/img/bee2.png";
import {
  navStatus,
  setLinkPage,
} from "../../redux/navigatinOnPage/navigatinOnPageSlice";
import { useNavPageSelector } from "../../redux/navigatinOnPage/navigatinOnPageSelector";

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const { navPageLink } = useNavPageSelector();
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 980);
  const { user, isLogin } = useUserSelector();

  useEffect(() => {
    function handleResize() {
      setIsWideScreen(window.innerWidth > 980);
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
          <Link to="/imker">
            {" "}
            <img
              src={logoBee}
              alt="bee"
              className={styles.logo_img}
              onClick={() => dispatch(navStatus(setLinkPage.main))}
            />
          </Link>
        </div>
        <div className={styles.title}>
          <h2 className={styles.logo_title}>HONEY</h2>
          <span className={styles.logo_slogan}>Sweet & Healhy life </span>
        </div>
      </div>

      <div className={`${styles.nav} ${styles.nav_with}`}>
        {isWideScreen ? (
          <ul className={styles.nav_list}>
            <li className={styles.item}>
              <NavLink
                to="/posts"
                className={`${styles.title_nav} ${
                  navPageLink === "/posts" ? styles.active : ""
                }`}
                onClick={() => dispatch(navStatus(setLinkPage.posts))}
              >
                Blog
              </NavLink>
            </li>
            <li className={styles.item}>
              <Link
                to="/events"
                className={`${styles.title_nav} ${
                  navPageLink === "/events" ? styles.active : ""
                }`}
                onClick={() => dispatch(navStatus(setLinkPage.events))}
              >
                Veranstaltungen
              </Link>
            </li>
            <li className={`${styles.item} ${styles.item_submenu}`}>
              <Link
                to="/aboutUs"
                className={`${styles.title_nav} ${
                  navPageLink === "/aboutUs" ? styles.active : ""
                }`}
                onClick={() => dispatch(navStatus(setLinkPage.aboutUs))}
              >
                Über uns
              </Link>
            </li>
            <li className={styles.item}>
              <Link
                to="/gallery"
                className={`${styles.title_nav} ${
                  navPageLink === "/gallery" ? styles.active : ""
                }`}
                onClick={() => dispatch(navStatus(setLinkPage.gallery))}
              >
                Galerie
              </Link>
            </li>
            <li className={styles.item}>
              <Link
                to="/contactUs"
                className={`${styles.title_nav} ${
                  navPageLink === "/contactUs" ? styles.active : ""
                }`}
                onClick={() => dispatch(navStatus(setLinkPage.contactUs))}
              >
                Kontakt
              </Link>
            </li>
            {user.role === ROLE.ADMIN ? (
              <li className={`${styles.item} ${styles.item_submenu_admin}`}>
                <Link
                  to="/adminpage"
                  className={`${styles.title_nav} ${
                    navPageLink === "/adminpage" ? styles.active : ""
                  }`}
                  onClick={() => dispatch(navStatus(setLinkPage.adminpage))}
                >
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
                  onClick={() => dispatch(navStatus(setLinkPage.singUp))}
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
