import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import { IUsersDto, initIUsersDto } from "./interfaces/IUsersDto";
import { IUserDto } from "../../AdminPage/UserAdmin/interfaces/IUserDto";
import UserEditAdmin from "./UserEditAdmin";
import styles from "./UserAdmin.module.css";

export default function UsersAdmin() {
  const [{ users, count, pages }, setUsers] =
    useState<IUsersDto>(initIUsersDto);
  const [user, setUser] = useState<IUserDto>();
  const [isEditShow, setIsEditShow] = useState<boolean>(false);
  const [isListShow, setIsListShow] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 5;

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getListOfUsers() {
      try {
        const response = await axios.get(
          `/api/users?page=0&items=${itemsOnPage}&orderBy=id&desc=true`, {
          withCredentials: true,
        });
        setUsers(response.data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    }
    getListOfUsers();
  }, []);

  async function handleLoadData(id: number) {
    try {
      const response = await axios.get(`/api/users/${id}`, { withCredentials: true, });
      setUser(await response.data);
      setIsLoaded(true);
      setIsEditShow(true);
      setIsListShow(false);
      // setIsCreateShow(false);
    } catch (error) {
      console.error("Error during request execution:", error);
    }
  }

  const getAnotherPage = async (_: ChangeEvent<unknown>, value: number) => {
    try {
      const response = await axios.get(
        `/api/users?page=${value - 1
        }&items=${itemsOnPage}&orderBy=id&desc=true`, { withCredentials: true, }
      );
      const usersData: IUsersDto = await response.data;
      setUsers(usersData);
      setCurrentPage(value);
    } catch (error) {
      console.error("Error during request execution:", error);
    }
  };

  return (
    <>
      <div className={styles.headerContainer}>
        <button
          className={isListShow ? styles.headBtnActive : styles.headBtn}
          onClick={() => {
            setIsEditShow(false);
            setIsListShow(true);
          }}
        >
          View list of Users
        </button>
        <button
          className={isEditShow ? styles.headBtnActive : styles.headBtn}
          onClick={() => {
            setIsEditShow(true);
            setIsListShow(false);
          }}
          disabled={isLoaded ? false : true}
        >
          Edit User
        </button>
        <hr />
      </div>

      {isEditShow && <UserEditAdmin location={{ state: user! }} />}

      {isListShow && (
        <div className={styles.container}>
          <p className={styles.totalCount}>Total count of users: {count}</p>

          <Pagination
            count={pages}
            page={currentPage}
            size="large"
            onChange={getAnotherPage}
          />

          {users.map(
            ({
              id,
              email,
              name,
              plz,
              image,
              phone,
              role,
              state,
            }) => (
              <div key={id} className={styles.postContainer}>
                <p className={styles.postData}>User id: {id}</p>
                <p className={styles.postData}>Image id: {image}</p>
                {name && (
                  <p className={styles.titlePost}>User name: {name}</p>
                )}
                <p className={styles.postData}>User email: {email}</p>
                <p className={styles.postData}>User phone: {phone}</p>
                <p className={styles.postData}>User plz: {plz}</p>
                <p className={styles.postData}>User role: {role}</p>
                <p className={styles.postData}>User state: {state}</p>
                <button
                  className={styles.editBtn}
                  onClick={() => handleLoadData(+id)}
                >
                  Edit this user
                </button>
              </div>
            )
          )}
          <Pagination
            count={pages}
            page={currentPage}
            size="large"
            onChange={getAnotherPage}
          />
        </div>
      )}
    </>
  );
}
