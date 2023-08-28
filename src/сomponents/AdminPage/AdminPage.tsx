import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TeamAdmin from "./AboutUsAdmin/TeamAdmin";
import TeamAddMemberAdmin from "./AboutUsAdmin/TeamAddNewMember";
import TeamEditMemberAdmin from "./AboutUsAdmin/TeamEditMemberAdmin";
import ContactUsAdmin from "./contactUsAdmin/ContactUsAdmin";
import PostsAdmin from "./PostsAdmin/PostsAdmin";
import FilesUploadAdmin from "./FilesUploadAdmin/FilesUploadAdmin";
import GalleryAdmin from "./GalleryAdmin/GalleryAdmin";
import AddEventAdmin from "./EventsAdmin/AddEventAdmin";
import EditAllEvents from "./EventsAdmin/EditAllEvents";
import EditEventAdmin from "./EventsAdmin/EditEventAdmin";
import { Container } from "react-bootstrap";

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AdminPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            maxWidth: { xs: 320, sm: "100%" },
            bgcolor: "background.paper",
          }}
        >
          <Tabs
            className="m-2 p-3"
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="about us" />
            <Tab label="addmember" />
            <Tab label="Team Edit Member" />
            <Tab label="contact us" />
            <Tab label="Posts" />
            <Tab label="Files Upload" />
            <Tab label="Gallery" />
            <Tab label="Add Event" />
            <Tab label="Edit Event" />
            <Tab label="Edit All Events" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TeamAdmin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TeamAddMemberAdmin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TeamEditMemberAdmin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <ContactUsAdmin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <PostsAdmin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <FilesUploadAdmin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <GalleryAdmin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={7}>
          <AddEventAdmin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={8}>
          <EditEventAdmin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={9}>
          <EditAllEvents />
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
