import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

const LoginLayout = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                margin: 0, // Remove any default margins
            }}
        >
            <Header />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    position: 'relative', // Allow positioning of children
                    overflow: 'hidden', // Prevent overflow
                    padding: 0, // Ensure no padding
                }}
            >
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default LoginLayout;
