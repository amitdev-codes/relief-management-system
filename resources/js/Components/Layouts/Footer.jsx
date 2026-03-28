// src/components/Footer.js
import React from 'react';
import { Box, Container, Typography, Link, IconButton, Grid, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box component="footer" sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            borderTop: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,  // Adding border to the top of the box
            backgroundColor: isDarkMode ? '#333' : 'grey.100',
            color: isDarkMode ? '#fff' : '#000'
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontFamily: 'Kalimati', color: isDarkMode ? '#fff' : '#000' }}>
                            सम्पर्क विवरण
                        </Typography>
                        <Box>
                            <Typography variant="body2">1234 Street Name, City, Country</Typography>
                            <Typography variant="body2">Phone: (123) 456-7890</Typography>
                            <Typography variant="body2">Email: info@example.com</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontFamily: 'Kalimati', color: isDarkMode ? '#fff' : '#000' }}>
                            आवश्यक जानकारी
                        </Typography>
                        <Box>
                            <Link href="#" variant="body2" display="block" color={isDarkMode ? '#ddd' : '#000'}>
                                About Us
                            </Link>
                            <Link href="#" variant="body2" display="block" color={isDarkMode ? '#ddd' : '#000'}>
                                Services
                            </Link>
                            <Link href="#" variant="body2" display="block" color={isDarkMode ? '#ddd' : '#000'}>
                                Contact
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ color: isDarkMode ? '#fff' : '#000' }}>
                            Follow Us
                        </Typography>
                        <Box display="flex" gap={1}>
                            <IconButton href="https://facebook.com" target="_blank" color="inherit">
                                <FacebookIcon sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                            </IconButton>
                            <IconButton href="https://twitter.com" target="_blank" color="inherit">
                                <TwitterIcon sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                            </IconButton>
                            <IconButton href="https://instagram.com" target="_blank" color="inherit">
                                <InstagramIcon sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                            </IconButton>
                            <IconButton href="https://linkedin.com" target="_blank" color="inherit">
                                <LinkedInIcon sx={{ color: isDarkMode ? '#fff' : '#000' }} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" align="center" color={isDarkMode ? '#ddd' : '#000'}>
                        &copy; {new Date().getFullYear()} Your Company. All rights reserved. | Developed by DevospAmit
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
