import { Box, Toolbar } from '@mui/material';
import { Outlet} from 'react-router-dom';
import {DoctorSideBar, TopNav } from '../components';
import avtImage from '../assets/img/doctor-avatar.jpg';

import React from 'react';

const DoctorLayout = () => {

    return (
        <Box>
            <TopNav dashboardType={'Doctor Dashboard'} avtImage={avtImage}/>
            <Box sx={{ display: 'flex' }}>
                <DoctorSideBar/>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        backgroundColor: '#eee',
                        width: 'max-content',
                    }}
                >
                    <Toolbar />
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default DoctorLayout;