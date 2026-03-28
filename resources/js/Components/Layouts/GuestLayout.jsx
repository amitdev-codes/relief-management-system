import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container, Box, useMediaQuery, useTheme } from '@mui/material';

const GuestLayout = ({ children }) => {
    const theme = useTheme();

    // Responsive checks for all breakpoints
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));
    const isMd = useMediaQuery(theme.breakpoints.only('md'));
    const isLg = useMediaQuery(theme.breakpoints.only('lg'));
    const isXl = useMediaQuery(theme.breakpoints.only('xl'));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Header />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: '80px',
                }}
            >
                <main>{children}</main>
            </Box>

            <Footer />
        </Box>
    );
};

export default GuestLayout;
