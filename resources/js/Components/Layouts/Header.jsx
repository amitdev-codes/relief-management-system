import React, { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, Typography, IconButton, Box, Button,
    useTheme, useMediaQuery, Menu, MenuItem, styled
} from '@mui/material';
import {
    Menu as MenuIcon, AccountCircle,
    DarkMode as DarkModeIcon, LightMode as LightModeIcon
} from '@mui/icons-material';
import { updateClock } from '@/utils/nepali';
import { router, usePage } from '@inertiajs/react';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
    top: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: theme.palette.primary.main,
}));

const Logo = styled('img')({
    height: 50,
    marginRight: 16,
});

const Flag = styled('img')({
    height: 30,
    marginLeft: 16,
});

const StyledTypography = styled(Typography)(({ theme, variant }) => ({
    fontSize: theme.typography[variant].fontSize * 1.2, // Increase font size by 20%
}));

const Header = ({ mode }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));

    const [nepaliTime, setNepaliTime] = useState('');
    const [nepaliDate, setNepaliDate] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const user = usePage().props.auth.user;

    useEffect(() => {
        const interval = setInterval(() => updateClock(setNepaliTime, setNepaliDate), 1000);
        return () => clearInterval(interval);
    }, []);

    const handleClick = () => router.visit(route('login'));
    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleLogout = () => router.post(route('logout'));

    return (
        <StyledAppBar position="fixed">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Logo and Title */}
                <Box display="flex" alignItems="center">
                    {!isXs && <Logo src="/assets/img/gov.png" alt="Government Logo" />}
                    <Box>
                        <StyledTypography variant={isXs ? "body2" : "h6"}>
                            राहत,अनुदान तथा ऋण
                        </StyledTypography>
                        <StyledTypography variant="body2">
                            व्यवस्थापन प्रणाली
                        </StyledTypography>
                    </Box>
                </Box>

                {/* Center Text */}
                {isLg && (
                    <Box textAlign="center">
                        <StyledTypography variant="h6" fontWeight="bold" fontSize="0.95rem">
                            प्रदेश सरकार
                        </StyledTypography>
                        <StyledTypography variant="body2">
                            भक्तपुर नगरपालिका
                        </StyledTypography>
                        <StyledTypography variant="body2">
                            बागमती प्रदेश, काठमाडौँ
                        </StyledTypography>
                    </Box>
                )}

                {/* Right Side Items */}
                <Box display="flex" alignItems="center">
                    {isMd && (
                        <StyledTypography variant="body2" color="inherit">
                            <span>{nepaliDate}</span>
                            <span>{nepaliTime}</span>
                        </StyledTypography>
                    )}

                    {isMd && <Flag src="/assets/img/nepal_flag.gif" alt="Nepal Flag" />}

                    {user ? (
                        <>
                            <IconButton color="inherit" onClick={handleMenuClick}>
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleMenuClose}>{user.name}</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 1 }}
                        >
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Header;
