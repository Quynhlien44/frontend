import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { OwnerSideBar, TopNav } from "../../components";
import avtImage from "../../assets/img/owner-avatar.jpg";

import React from "react";

const OwnerLayout = () => {
  return (
    <Box>
      <TopNav dashboardType={"Owner Dashboard"} avtImage={avtImage} />
      <Box sx={{ display: "flex" }}>
        <OwnerSideBar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#eee",
            width: "max-content",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default OwnerLayout;
