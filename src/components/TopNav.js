import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { AppBar, Avatar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const TopNav = (props) => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: '#fff',
                color: '#000',
                zIndex: theme.zIndex.drawer + 1,
                boxShadow: '0px 1px 4px 1px rgb(0 0 0 / 12%)',
            }}
            elevation={0}
        >
            <Toolbar>
                <LocalHospitalIcon sx={{ color: 'green', marginRight: '10px' }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                   {props.dashboardType}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        alt="User image"
                        src={props.avtImage}
                        sx={{ height: '30px', width: '30px' }}
                    />
                    <IconButton
                        aria-label="exit"
                        color="primary"
                        onClick={() => navigate('/')}
                    >
                        <ExitToAppOutlinedIcon />
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default TopNav;