import AuthenticatedLayout from "@/Components/Layouts/AuthenticatedLayout";
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import Chip from '@mui/material/Chip';
import { contentData, statusData } from '@/forms/landing';
import { useIsMobile } from '@/hooks/responsive/useIsMobile';

const Dashboard = () => {
    const isMobile = useIsMobile();
    return (
        <AuthenticatedLayout>
            <Box sx={{ width: '100%', fontFamily: 'Kalimati' }}>
                <Grid container spacing={isMobile ? 2 : 4}>
                    {contentData.map((item, index) => (
                        <Grid item xs={12} sm={12} md={3} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    backgroundColor: item.backgroundColor,
                                    '&:hover': {
                                        boxShadow: 8,
                                    },
                                }}
                                onClick={() => handleCardClick(item.route)}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ marginRight: 2 }}>
                                            {item.icon}
                                        </Box>
                                        <Typography variant="h6" component="div">
                                            {item.title}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Latest Status Section */}
                <Box sx={{ my: isMobile ? 2 : 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontFamily: "kalimati" }}>
                        तथ्याङ्कहरु
                    </Typography>
                    <Grid container spacing={isMobile ? 2 : 3}>
                        {statusData.map((item, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card

                                >
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ fontFamily: "kalimati" }}>
                                            <Chip icon={<ForumIcon />} label={item.title} />

                                        </Typography>
                                        <Typography variant="h4" component="div" color="primary" sx={{ fontFamily: "kalimati" }}>
                                            {item.count}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
};
export default Dashboard;
