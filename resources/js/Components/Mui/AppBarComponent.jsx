import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon, Menu as MenuIcon } from '@mui/icons-material';
import { updateClock } from '@/utils/nepali';
import { router } from '@inertiajs/react';

const AppBarComponent = ({ toggleTheme, handleProfileMenuOpen, handleLanguageChange }) => {
    const [nepaliTime, setNepaliTime] = useState('');
    const [nepaliDate, setNepaliDate] = useState('');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleClick = () => {
        router.visit(route('login'));
    };

    useEffect(() => {
        updateClock(setNepaliTime, setNepaliDate);
        const interval = setInterval(() => {
            updateClock(setNepaliTime, setNepaliDate);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AppBar position="static" sx={{ top: 0, left: 0, right: 0 }}>
            <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {isMobile ? (
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                ) : (
                    <Box display="flex" alignItems="center">
                        <img src="/assets/img/gov.png" alt="Government Logo" style={{ height: 40, marginRight: 16 }} />
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontFamily: "kalimati" }}>
                                राहत,अनुदान तथा ऋण
                            </Typography>
                            <Typography variant="caption" sx={{ fontFamily: "kalimati" }}>
                                व्यवस्थापन प्रणाली
                            </Typography>
                        </Box>
                    </Box>
                )}

                {!isMobile && (
                    <Box textAlign="center" sx={{ fontFamily: "kalimati" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            प्रदेश सरकार
                        </Typography>
                        <Typography variant="caption">
                            भक्तपुर नगरपालिका
                        </Typography>
                        <Typography variant="caption" display="block">
                            बागमती प्रदेश, काठमाडौँ
                        </Typography>
                    </Box>
                )}

                <Box display="flex" alignItems="center">
                    {!isMobile && (
                        <Typography variant="caption" color="inherit" sx={{ mr: 1 }}>
                            <span id="DATE_IN_NEPALI">{nepaliDate}</span>
                            <span id="TIME_IN_NEPALI">{nepaliTime}</span>
                        </Typography>
                    )}

                    <IconButton color="inherit" onClick={toggleTheme} size="small">
                        {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>

                    {!isMobile && (
                        <img src="/assets/img/nepal_flag.gif" alt="Nepal Flag" style={{ height: 30, margin: '0 8px' }} />
                    )}

                    <Button variant="contained" onClick={handleClick} size="small">
                        Login
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;
