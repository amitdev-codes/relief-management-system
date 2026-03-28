// ErrorPage.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';


const ErrorPage = ({ errorCode, message }) => {


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
            <Typography variant="h1" component="h1" gutterBottom>
                {errorCode}
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
                {message}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoHome}>
                Go Back Home
            </Button>
        </Box>
    );
};

export default ErrorPage;
