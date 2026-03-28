// ServerErrorPage.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

// Import the image

const ServerErrorPage = () => {

    const handleGoHome = () => {
        window.history.back(); // Redirect to the home page
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgcolor="#f8f9fa"
            textAlign="center"
        >
            <img src="/img/404.svg" alt="Frustrated Boy" style={{ width: '200px', marginBottom: '20px' }} />
            <Typography variant="h1" component="h1" gutterBottom>
                500
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
                Oops! Something went wrong on our end.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoHome}>
                Go Back Home
            </Button>
        </Box>
    );
};

export default ServerErrorPage;
