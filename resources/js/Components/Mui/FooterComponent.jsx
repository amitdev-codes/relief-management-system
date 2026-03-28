import React from 'react';
import { Box, Typography, Link, IconButton, Grid, useTheme, Card, CardContent } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const FooterComponent = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const cardStyle = {
        backgroundColor: isDarkMode ? '#444' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        height: '100%', // Ensure all cards have the same height
        display: 'flex',
        flexDirection: 'column',
    };

    const cardContentStyle = {
        flexGrow: 1, // Allow content to grow and fill the card
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    };

    return (
        <Box sx={{
            backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
            color: isDarkMode ? '#fff' : '#000',
            padding: '20px',
            marginTop: 'auto'
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card sx={cardStyle}>
                        <CardContent sx={cardContentStyle}>
                            <Typography variant="h6" gutterBottom sx={{ fontFamily: "Kalimati" }}>सम्पर्क विवरण</Typography>
                            <Box>
                                <Typography variant="body2">1234 Street Name, City, Country</Typography>
                                <Typography variant="body2">Phone: (123) 456-7890</Typography>
                                <Typography variant="body2">Email: info@example.com</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={cardStyle}>
                        <CardContent sx={cardContentStyle}>
                            <Typography variant="h6" gutterBottom sx={{ fontFamily: "Kalimati" }}>आबश्यक जानकारी</Typography>
                            <Box>
                                <Link href="#" variant="body2" display="block" color={isDarkMode ? '#ddd' : '#000'}>About Us</Link>
                                <Link href="#" variant="body2" display="block" color={isDarkMode ? '#ddd' : '#000'}>Services</Link>
                                <Link href="#" variant="body2" display="block" color={isDarkMode ? '#ddd' : '#000'}>Contact</Link>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={cardStyle}>
                        <CardContent sx={cardContentStyle}>
                            <Typography variant="h6" gutterBottom>Follow Us</Typography>
                            <Box display="flex" gap={1} justifyContent="center">
                                <IconButton href="https://facebook.com" target="_blank" color="inherit">
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton href="https://twitter.com" target="_blank" color="inherit">
                                    <TwitterIcon />
                                </IconButton>
                                <IconButton href="https://instagram.com" target="_blank" color="inherit">
                                    <InstagramIcon />
                                </IconButton>
                                <IconButton href="https://linkedin.com" target="_blank" color="inherit">
                                    <LinkedInIcon />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Box sx={{ marginTop: '20px', borderTop: `1px solid ${isDarkMode ? '#555' : '#ddd'}`, paddingTop: '10px' }}>
                <Typography variant="body2" color="textSecondary" align="center">
                    &copy; {new Date().getFullYear()} Your Company. All rights reserved. | Developed by DevospAmit
                </Typography>
            </Box>
        </Box>
    );
};

export default FooterComponent;
