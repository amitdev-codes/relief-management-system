import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react'
import { updateClock } from '@/utils/nepali';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Chip, Menu, MenuItem, Tooltip, useMediaQuery } from '@mui/material';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon, Dashboard as DashboardIcon, Assignment as AssignmentIcon, LocalShipping as LocalShippingIcon, Help as HelpIcon, People as PeopleIcon, LocalAtm as LocalAtmIcon, Receipt as ReceiptIcon, TextFields as TextFieldsIcon } from '@mui/icons-material';
import { router } from '@inertiajs/react';
import MenuIcon from '@mui/icons-material/Menu';

const AppBarComponent = ({ theme, toggleTheme, toggleSidebar }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [nepaliTime, setNepaliTime] = useState('');
    const [nepaliDate, setNepaliDate] = useState('');
    const { auth } = usePage().props;
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        updateClock(setNepaliTime, setNepaliDate);
        const interval = setInterval(() => {
            updateClock(setNepaliTime, setNepaliDate);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        router.visit("logout", { method: 'post' });
    };

    return (
        <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
            <Toolbar style={{ fontFamily: "kalimati" }} sx={{ flexWrap: 'wrap' }}>
                {isMobile && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleSidebar}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {/* Logo and Project Name */}
                <Box display="flex" alignItems="center" sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'auto' }, mb: { xs: 1, sm: 0 } }}>
                    <img src="/assets/img/gov.png" alt="Government Logo" style={{ height: 40, marginRight: 16 }} />
                    <Box>
                        <Typography variant="h6" style={{ fontFamily: "kalimati", textAlign: 'center' }} noWrap>
                            राहत,अनुदान तथा ऋण
                        </Typography>
                        <Typography variant="body2" style={{ fontFamily: "kalimati" }} noWrap>
                            व्यवस्थापन प्रणाली
                        </Typography>
                    </Box>
                </Box>

                {/* Centered Address - hidden on mobile */}
                <Box
                    display={{ xs: 'none', md: 'flex' }}
                    alignItems="center"
                    justifyContent="center"
                    style={{ fontFamily: "kalimati" }}
                    sx={{ flexGrow: 1 }}
                >
                    <Box textAlign="center">
                        <Typography variant="h6" component="div" style={{ fontWeight: 'bold', fontFamily: "kalimati" }} noWrap>
                            प्रदेश सरकार
                        </Typography>
                        <Typography variant="body2" style={{ fontFamily: "kalimati" }} noWrap>
                            भक्तपुर नगरपालिका
                        </Typography>
                        <Typography variant="body2" style={{ fontFamily: "kalimati" }} noWrap>
                            बागमती प्रदेश, काठमाडौँ
                        </Typography>
                    </Box>
                </Box>

                {/* Right side elements */}
                <Box display="flex" alignItems="center" sx={{ ml: 'auto' }}>
                    <Typography variant="body2" color="inherit" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <span id="DATE_IN_NEPALI">{nepaliDate}</span>
                        <span id="TIME_IN_NEPALI">{nepaliTime}</span>
                    </Typography>

                    <IconButton color="inherit" onClick={toggleTheme} size="small">
                        {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>

                    <img src="/assets/img/nepal_flag.gif" alt="Nepal Flag" style={{ height: 30, marginRight: 10 }} />

                    <Tooltip title={auth.user.name}>
                        <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 1 }}>
                            <Avatar alt={auth.user.name} src="/static/images/avatar/2.jpg" sx={{ width: 32, height: 32 }} />
                        </IconButton>
                    </Tooltip>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;
