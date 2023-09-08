import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import TeamAdmin from "./AboutUsAdmin/TeamAdmin";
// import ContactUsAdmin from "./contactUsAdmin/ContactUsAdmin";
import PostsAdmin from "./PostsAdmin/PostsAdmin";
import FilesUploadAdmin from "./FilesUploadAdmin/FilesUploadAdmin";
import GalleryAdmin from "./GalleryAdmin/GalleryAdmin";
import { Container } from "react-bootstrap";
import styles from "../AdminPage/PostsAdmin/PostAdmin.module.css";
// import AddEventAdmin from "./EventsAdmin/AddEventAdmin";
import UsersAdmin from "./UserAdmin/UsersAdmin";
import { IUserDto, initIUserDto } from "./UserAdmin/interfaces/IUserDto";
import { useEffect, useState } from "react";
import axios from "axios";
import SliderAdmin from "./SliderAdmin/SliderAdmin";
import EventNav from "./EventsAdmin/EventNav";
import AboutUsNav from "./AboutUsAdmin/AboutUsNav";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, minHeight: "600px" }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [value, setValue] = React.useState(0);
  const [me, setMe] = useState<IUserDto>(initIUserDto);
  const isLogined = localStorage.getItem("IMKER");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLogined === "true") {
          const getMyId = await axios.get(`/api/me`, {
            withCredentials: true,
          });
          const userDto = getMyId.data;
          setMe(userDto);
        }
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };

    fetchData();
  }, [isLogined, me.role]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {/* {me.role === "ADMIN" && ( */}
      <div>
        <div className={styles.bgndPost}></div>
        <Container>
          <Box
            sx={{
              maxWidth: { xs: 320, sm: "100%" },
              bgcolor: "background.paper",
            }}
            className="d-flex justify-content-center mt-4 p-2 fs-2"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab className="fs-5" label="BLOG" />
              <Tab className="fs-5" label="VERANSTALTUNGEN" />
              <Tab className="fs-5" label="Kontaktieren Sie uns" />
              <Tab className="fs-5" label="Über uns" />
              <Tab className="fs-5" label="Gallery" />
              <Tab className="fs-5" label="Sliders" />
              <Tab className="fs-5" label="Users" />
              <Tab className="fs-5" label="Files Upload" />
            </Tabs>
          </Box>
        </Container>
        <CustomTabPanel value={value} index={0}>
          <PostsAdmin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="container">
            <EventNav />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AboutUsNav />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <div className="container">
            <AboutUsNav />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <GalleryAdmin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <SliderAdmin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <UsersAdmin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={7}>
          <FilesUploadAdmin />
        </CustomTabPanel>
      </div>
      {/* )} */}
    </>
  );
}
