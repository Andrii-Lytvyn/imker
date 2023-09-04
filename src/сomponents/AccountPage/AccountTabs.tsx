import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UserInfo from "./UserInfo";
import UserEvents from "./UserEvents";
import UserSettings from "./UserSettings";
import { FiSettings } from "react-icons/fi";
import { LiaInfoSolid } from "react-icons/lia";
import { GrSchedule } from "react-icons/gr";

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
        <Box sx={{ p: 3, minHeight: "400px" }}>
          <div>{children}</div>
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

export default function AccountTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{ display: "flex", justifyContent: "space-between" }}
          value={value}
          onChange={handleChange}
          aria-label="tabs"
        >
          <Tab
            sx={{ flexGrow: 1 }}
            label={
              <span>
                <LiaInfoSolid style={{ fontSize: "25px" }} /> Meine Informationen
              </span>
            }
            {...a11yProps(0)}
          />
          <Tab
            sx={{ flexGrow: 1 }}
            label={
              <span>
                <GrSchedule style={{ fontSize: "20px", marginRight: "5px" }} /> Meine geplanten Veranstaltungen
              </span>
            }
            {...a11yProps(1)}
          />
          <Tab
            sx={{ flexGrow: 1 }}
            label={
              <span>
                <FiSettings style={{ fontSize: "20px", marginRight: "5px" }} /> Meine Einstellungen
              </span>
            }
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <UserInfo />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserEvents />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <UserSettings />
      </CustomTabPanel>
    </Box>
  );
}
