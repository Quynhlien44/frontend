import PetsIcon from "@mui/icons-material/Pets";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const OwnerSideBar = () => {
  const location = useLocation();
  const sideBarWidth = 300;
  const [activeIndex, setActiveIndex] = useState();

  const sideBarItems = [
    {
      text: "Pets",
      path: `owner/pets`,
      icon: <PetsIcon />,
    },
    {
      text: "Visits List",
      path: `owner/visits/`,
      icon: <PlaceOutlinedIcon />,
    },
  ];

  useEffect(() => {
    const activeItem = sideBarItems.findIndex(
      (item) =>
        window.location.pathname.split("/")[1] === item.path.split("/")[1]
    );
    setActiveIndex(activeItem);
  }, [location]);

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      sx={{
        width: sideBarWidth,
        height: "100vh",
        boxShadow: "0px 1px 4px 1px rgb(0 0 0 / 12%)",
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: sideBarWidth,
          borderRight: 0,
        },
      }}
      open={true}
    >
      <Toolbar />
      <List>
        {sideBarItems.map((item, index) => (
          <ListItemButton
            key={`sidebar-key-${index}`}
            selected={index === activeIndex}
            component={Link}
            to={item.path}
            sx={{
              width: "calc(100% -20px)",
              margin: "5px auto",
              borderRadius: "10px",
              "&.Mui-selected": {
                color: "blue",
              },
              "&.Mui-seleted:hover": {
                backgroundColor: "DodgerBlue",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: index === activeIndex && "blue",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.text}
              sx={{
                "& span": {
                  fontWeight: index === activeIndex && "500",
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default OwnerSideBar;
