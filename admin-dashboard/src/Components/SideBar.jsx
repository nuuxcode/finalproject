import React from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {grey} from '@mui/material/colors';

const drawerWidth = 240;
const Array1 = [
  { text: "Dashboard", icon: <HomeOutlinedIcon />, path: "/" },
  { text: "Manage Team", icon: <PeopleAltOutlinedIcon />, path: "/team" },
  {
    text: "Users Information",
    icon: <PermContactCalendarOutlinedIcon />,
    path: "/users",
  },
];

const Array2 = [
  { text: "Bar Chart", icon: <BarChartOutlinedIcon />, path: "/bar" },
  { text: "Reports and likes", icon: <PieChartOutlineOutlinedIcon />, path: "/reports" },
  {
    text: "Line Chart",
    icon: <TimelineOutlinedIcon />,
    path: "/line",
  },

];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(
  // @ts-ignore
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);



/**? */
export default function SideBar({ open, handleDrawerClose }) {
  const theme = useTheme();
  const navigate = useNavigate();
  let location = useLocation();


  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />

      <Avatar
        sx={{
          mx: "auto",
          width: open ?  88 : 44,
          height: open ? 88 : 44,
          my: 1,
          border: "2px solid grey",
          transition : "0.25s",
        }}
        alt="logo"
        src="/src/logo.png"
      />
      <Typography align="center" sx={{ fontSize: open ? 17 : 0 , transition : "0.25s"}}>
oumayma mazoz      </Typography>
      <Typography align="center" sx={{ fontSize: open ? 19 : 0, transition : "0.25s", color: "#FFFF00" }}>
        Admin
      </Typography>
      <Divider />
      <List>
        {Array1.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={()=>{navigate(item.path)}}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                 location.pathname === item.path 
                ? theme.palette.mode === "dark"
                 ? grey[800]
                 : grey[300]
                 : null ,   
               }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    
      <Divider />
      <List>
        {Array2.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={()=>{navigate(item.path)}}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                 location.pathname === item.path 
                ? theme.palette.mode === "dark"
                 ? grey[800]
                 : grey[300]
                 : null ,  
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
