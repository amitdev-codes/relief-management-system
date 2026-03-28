import React from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import Chip from '@mui/material/Chip';
import ImageCarouselComponent from '@/Components/Mui/ImageCarouselComponent';
import { contentData, statusData } from '@/forms/landing';
import { useIsMobile } from '@/hooks/responsive/useIsMobile';
import GuestLayout from '@/Components/Layouts/GuestLayout';
import SchoolIcon from '@mui/icons-material/School'; // For Education Program
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // For Relief Program
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'; // For Grant Program
import { deepPurple, teal, amber } from '@mui/material/colors';
import Grid from '@mui/material/Grid2';

const officialsData = [
    { name: "President", role: "Mr. A. Sharma", image: "/path/to/president.jpg" },
    { name: "Vice President", role: "Mrs. B. Tamang", image: "/path/to/vice-president.jpg" },
    { name: "IT Officer", role: "Mr. C. Lama", image: "/path/to/it-officer.jpg" },
];

const programDescriptions = [
    {
        title: 'राहत कार्यक्रम',
        description: 'यो राहत कार्यक्रमले विपद्मा परेका व्यक्तिहरुलाई आर्थिक सहायता प्रदान गर्दछ।',
        icon: <LocalHospitalIcon fontSize="large" />,
        bgColor: deepPurple[200],
    },
    {
        title: 'अनुदान कार्यक्रम',
        description: 'अनुदान कार्यक्रमले आर्थिक रुपमा कमजोर परिवारहरुका लागि सहयोग प्रदान गर्दछ।',
        icon: <VolunteerActivismIcon fontSize="large" />,
        bgColor: amber[200],
    },
    {
        title: 'शैक्षिक ऋण कार्यक्रम',
        description: 'शैक्षिक ऋण कार्यक्रमले विद्यार्थीहरुलाई शैक्षिक खर्च पूरा गर्न ऋण प्रदान गर्दछ।',
        icon: <SchoolIcon fontSize="large" />,
        bgColor: teal[200],
    },
];

const Landing = () => {
    const isMobile = useIsMobile();

    return (
        <GuestLayout>

            <Box sx={{ fontFamily: 'Kalimati', flexGrow: 1 }}>
                <Grid container spacing={1}>
                    {/* Left Side - Loan Status Section */}
                    <Grid size={2}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': { width: '0.4em' },
                            '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,.1)' }
                        }}>
                            {statusData.map((item, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        backgroundColor: item.backgroundColor,
                                        minHeight: '60px',
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                            boxShadow: 8,
                                        },
                                        mb: 2
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant={isMobile ? "subtitle1" : "h6"}>
                                            <Chip icon={<ForumIcon />} label={item.title} />
                                        </Typography>
                                        <Typography variant={isMobile ? "h5" : "h4"} color="primary">
                                            {item.count}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Grid>
                    {/* Middle Section - Content Grid */}
                    <Grid size={8}>
                        <Grid container justifyContent="center" spacing={2}>
                            {contentData.map((item, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                                    <Card
                                        sx={{
                                            backgroundColor: item.backgroundColor,
                                            padding: '4px',
                                            transition: 'transform 0.3s ease-in-out',
                                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
                                            },
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                        }}
                                        onClick={() => handleCardClick(item.route)}
                                    >
                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                                <Box sx={{ marginRight: 1 }}>{item.icon}</Box>
                                                <Typography
                                                    variant={isMobile ? "subtitle2" : "subtitle1"}
                                                    sx={{ fontFamily: 'Kalimati', fontSize: '14px' }}
                                                >
                                                    {item.title}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                variant="body1"
                                                color="primary"
                                                sx={{ fontWeight: 'bold', fontSize: '16px' }}
                                            >
                                                {item.count}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        {/* Center - Image Carousel */}
                        <Grid item xs={12} md={8}>
                            <Box sx={{ my: isMobile ? 2 : 4, overflow: 'hidden', flexGrow: 1 }}>
                                <ImageCarouselComponent />
                            </Box>
                        </Grid>

                    </Grid>

                    {/* Right Side - Officials */}
                    <Grid size={2}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': { width: '0.4em' },
                            '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,.1)' }
                        }}>
                            {officialsData.map((official, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: 2,
                                        boxShadow: 4,
                                        maxWidth: '100%',
                                        mb: 2
                                    }}
                                >
                                    <Avatar
                                        alt={official.name}
                                        src={official.image}
                                        sx={{ width: 100, height: 100, mb: 1 }}
                                    />
                                    <Typography variant="h6" sx={{ fontFamily: "Kalimati" }}>
                                        {official.role}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {official.name}
                                    </Typography>
                                </Card>
                            ))}
                        </Box>
                    </Grid>

                    {/* Bottom Section - Program Descriptions in Nepali */}

                    <Grid size={12}>
                        <Box sx={{ my: 4 }}>
                            <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontFamily: 'Kalimati', mb: 2, ml: 2 }}>
                                कार्यक्रमहरु
                            </Typography>
                            <Grid container spacing={2}>
                                {programDescriptions.map((program, index) => (
                                    <Grid size={4}>
                                        <Card
                                            sx={{
                                                backgroundColor: program.bgColor,
                                                color: 'black',
                                                padding: 2,
                                                boxShadow: 3,
                                            }}
                                        >
                                            <CardContent>
                                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {program.icon}
                                                    <span style={{ marginLeft: 8 }}>{program.title}</span>
                                                </Typography>
                                                <Typography variant="body1">
                                                    {program.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid >
            </Box >
        </GuestLayout>
    );
};

export default Landing;
