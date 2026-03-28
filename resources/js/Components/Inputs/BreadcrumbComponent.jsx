import React from 'react';
import { Breadcrumbs, Typography, Link, Box } from '@mui/material';
import { Home as HomeIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { Link as InertiaLink } from '@inertiajs/react';

const BreadcrumbComponent = ({ items }) => {
    return (
        <Box sx={{
            backgroundColor: 'background.paper',
            borderRadius: 1,
            p: 2,
            mb: 2,
            boxShadow: 1,
            width: '100%'
        }}>
            <Breadcrumbs
                separator={<ChevronRightIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <Link
                    component={InertiaLink}
                    href={route('adminDashboard')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Dashboard
                </Link>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return isLast ? (
                        <Typography
                            key={index}
                            color="text.primary"
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            {item.icon && React.cloneElement(item.icon, { sx: { mr: 0.5 }, fontSize: "inherit" })}
                            {item.label}
                        </Typography>
                    ) : (
                        <Link
                            key={index}
                            component={InertiaLink}
                            href={item.href}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'text.primary',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            {item.icon && React.cloneElement(item.icon, { sx: { mr: 0.5 }, fontSize: "inherit" })}
                            {item.label}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Box>
    );
};

export default BreadcrumbComponent;
