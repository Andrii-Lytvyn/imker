import { Avatar } from "@mui/material";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { useEffect, useState } from "react";
import linkToServer from "../globalLinkToServer";
import { IUserAccountInfo, initIUserAccountInfo } from "./interfaces/IUserAccountInfo";
import axios from "axios";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function AccountPage(): JSX.Element {
  const [userInfo, setUserInfo] = useState<IUserAccountInfo | undefined>(initIUserAccountInfo);
  const id = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${linkToServer}/api/users/${id}`);
        const userDto = response.data;
        setUserInfo(userDto);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };

    fetchData();
  }, [id]);


  return (
    <>
    <StyledBadge
  overlap="circular"
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  variant="dot"
>
      <Avatar
        alt={userInfo?.name}
        src={linkToServer + "/api/files/" + 5}
        variant="rounded"
        sx={{ width: 200, height: 250, margin: 5 }}
        />
        </StyledBadge>

      <p>{userInfo?.name}</p>

    </>
  );
}
