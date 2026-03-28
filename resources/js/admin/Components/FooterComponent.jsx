import React from 'react';
import { Box, Typography, Link, IconButton, Grid, Card, CardContent } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const FooterComponent = ({ theme, toggleTheme }) => {
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box sx={{
            backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
            color: isDarkMode ? '#fff' : '#000',
            padding: '20px',
            marginTop: 'auto'
        }}>
            <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
                {/* First Column */}
                <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
                    <Card sx={{
                        backgroundColor: isDarkMode ? '#444' : '#fff',
                        color: isDarkMode ? '#fff' : '#000',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        flexGrow: 1,  // Ensures equal width
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}>
                        <CardContent sx={{ fontFamily: "Kalimati", flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontFamily: "Kalimati" }}>सम्पर्क विवरण </Typography>
                            <Typography variant="body2">1234 Street Name, City, Country</Typography>
                            <Typography variant="body2">Phone: (123) 456-7890</Typography>
                            <Typography variant="body2">Email: info@example.com</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Second Column */}
                <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
                    <Card sx={{
                        backgroundColor: isDarkMode ? '#444' : '#fff',
                        color: isDarkMode ? '#fff' : '#000',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        flexGrow: 1,  // Ensures equal width
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontFamily: "Kalimati" }}>आबश्यक जानकारी </Typography>
                            <Link href="#" variant="body2" display="block" color={isDarkMode ? '#ddd' : '#000'}>About Us</Link>
                            <Link href="#" variant="body2" display="block" color={isDarkMode ? '#ddd' : '#000'}>Services</Link>
                            <Link href="#" variant="body2" display="block" color={isDarkMode ? '#ddd' : '#000'}>Contact</Link>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Third Column */}
                <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
                    <Card sx={{
                        backgroundColor: isDarkMode ? '#444' : '#fff',
                        color: isDarkMode ? '#fff' : '#000',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        flexGrow: 1,  // Ensures equal width
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>Follow Us</Typography>
                            <Box display="flex" gap={1}>
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

            {/* Footer Bottom */}
            <Box sx={{ marginTop: '20px', borderTop: `1px solid ${isDarkMode ? '#555' : '#ddd'}`, paddingTop: '10px' }}>
                <Typography variant="body2" color="textSecondary" align="center">
                    &copy; {new Date().getFullYear()} Your Company. All rights reserved. | Developed by DevospAmit
                </Typography>
            </Box>
        </Box>
    );
};

export default FooterComponent;
