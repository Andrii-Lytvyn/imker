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
    <div className="container">
      <p className="fs-4 m-4">E-mail: {email}</p>
      <p className="fs-4 m-4">Phone: {phone}</p>
      <p className="fs-4 m-4">Postleitzahlen: {plz}</p>
    </div>
  );
}
