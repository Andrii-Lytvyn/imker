import { useEffect, useState } from "react";
import linkToServer from "../globalLinkToServer";
import {
  IUserAccountInfo,
  initIUserAccountInfo,
} from "./interfaces/IUserAccountInfo";
import axios from "axios";

export default function UserInfo():JSX.Element {
  const [userInfo, setUserInfo] = useState<IUserAccountInfo | undefined>(
    initIUserAccountInfo
  );
  const id = 3;

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
    <div>
      
      <p>E-mail: {userInfo?.email}</p>
      <p>Phone: {userInfo?.phone}</p>
      <p>PLZ: {userInfo?.plz}</p>
      
    </div>
  )
}
