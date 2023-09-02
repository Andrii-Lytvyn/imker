import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TeamAdmin from "./AboutUsAdmin/TeamAdmin";
import ContactUsAdmin from "./contactUsAdmin/ContactUsAdmin";
import PostsAdmin from "./PostsAdmin/PostsAdmin";
import FilesUploadAdmin from "./FilesUploadAdmin/FilesUploadAdmin";
import GalleryAdmin from "./GalleryAdmin/GalleryAdmin";
import { Container } from "react-bootstrap";
import styles from "../AdminPage/PostsAdmin/PostAdmin.module.css";
import AddEventAdmin from "./EventsAdmin/AddEventAdmin";


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
        <Box sx={{ p: 3, minHeight: '600px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
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
            <Tab className="fs-5" label="Mitglieder der Gemeinschaft" />
            <Tab className="fs-5" label="Gallery" />
            <Tab className="fs-5" label="Files Upload" />
          </Tabs>
        </Box>
      </Container>
      <CustomTabPanel value={value} index={0}>
        <PostsAdmin />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="container">
          <AddEventAdmin />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ContactUsAdmin />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <TeamAdmin />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <GalleryAdmin />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <FilesUploadAdmin />
      </CustomTabPanel>
    </>
  );
}
