import { useEffect, useState } from "react";
import {
  IUserAccountInfo,
  initIUserAccountInfo,
} from "./interfaces/IUserAccountInfo";
import axios from "axios";

export default function UserInfo(): JSX.Element {
  const [{ email, phone, plz }, setUserInfo] =
    useState<IUserAccountInfo>(initIUserAccountInfo);

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

  return (
    <div>
      <p>E-mail: {email}</p>
      <p>Phone: {phone}</p>
      <p>PLZ: {plz}</p>
    </div>
  );
}
