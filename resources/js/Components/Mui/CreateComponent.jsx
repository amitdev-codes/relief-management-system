import React from 'react'
import { Link, router } from '@inertiajs/react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Box, Card, CardHeader, CardContent, Typography, Button, useTheme, Tooltip, Chip, useMediaQuery } from '@mui/material';
const CreateComponent = ({ title, route }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs')); // Check for small screens
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ padding: '4px 16px' }} >
            <Typography variant="h6" component="span" >
                {title} {/* Title text */}
            </Typography>

            <Link href={route} className="add-new-link">
                <Button
                    variant="contained"
                    color="secondary" // Change color as needed
                    size={isXs ? "small" : "medium"}
                    startIcon={<AddIcon />}
                    sx={{ mt: 1, height: '40px' }} // Add margin-top for spacing
                >
                    नयाँ थप्नुहोस
                </Button>
            </Link>
        </Box>
    );
}

export default CreateComponent
