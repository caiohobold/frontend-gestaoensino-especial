import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

const Navbar = () => {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push('/home');
    };

    const handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        router.push('/');
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#2a3d2f', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Box
                    sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    onClick={handleLogoClick}
                >
                    <Typography variant="h6" component="div">
                        GEE - Gestão de Ensino Especial
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 12,
                                height: 12,
                                backgroundColor: 'green',
                                borderRadius: '50%',
                            }}
                        />
                        <Typography variant="subtitle1" sx={{ color: 'white' }}>
                            Online
                        </Typography>
                    </Box>
                    <Avatar alt="User Avatar" src="/avatar.png" />
                    <IconButton edge="end" color="inherit" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
