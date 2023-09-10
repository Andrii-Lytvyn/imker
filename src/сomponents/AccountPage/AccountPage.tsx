import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import {
  IUserAccountInfo,
  initIUserAccountInfo,
} from "./interfaces/IUserAccountInfo";
import styles from "./AccountPage.module.css";
import axios from "axios";
import AccountTabs from "./AccountTabs";
import { motion } from "framer-motion";

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

export default function AccountPage(): JSX.Element {
  const [userInfo, setUserInfo] = useState<IUserAccountInfo | undefined>(
    initIUserAccountInfo
  );
  const isLogined = localStorage.getItem("IMKER");

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
    if (isLogined === "true") {
      fetchData();
    }
  }, [isLogined, userInfo?.id]);

  return (
    <>
      <div className={styles.account_main}>
        {isLogined === "true" && userInfo?.id != -1 && (
          <div className="container d-flex">
            {userInfo?.email && (
              <div className="d-flex flex-column align-items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 10,
                  }}
                >
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      src={"/api/files/" + userInfo?.image}
                      variant="rounded"
                      sx={{ width: 200, height: 250, margin: 5, fontSize: 60 }}
                    />
                  </StyledBadge>
                </motion.div>
                {userInfo.role === "MEMBER" && (
                  <img
                    src="/img/member.png"
                    alt="member"
                    style={{ marginTop: "-60px", zIndex: 3 }}
                  />
                )}
                <p
                  className="fs-2"
                  style={{
                    fontStyle: "italic",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    marginTop: "-20px",
                    textAlign: "center",
                    lineHeight: "1.2",
                  }}
                >
                  {userInfo?.name}
                </p>
              </div>
            )}

            <AccountTabs />
          </div>
        )}
      </div>
    </>
  );
}
