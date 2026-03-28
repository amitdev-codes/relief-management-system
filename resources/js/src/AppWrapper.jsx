import React, { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, IconButton, useMediaQuery, useTheme } from '@mui/material';
import BaseTheme from '@/theme/BaseTheme';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';

const AppWrapper = ({ App, props }) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');
    const appliedTheme = useMemo(() => BaseTheme(mode), [mode]);


    const handleThemeToggle = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={appliedTheme}>
            <CssBaseline />
            <IconButton
                onClick={handleThemeToggle}
                color="inherit"
                sx={{
                    position: 'fixed',
                    zIndex: 9999,
                    backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                        backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                    },
                    transition: 'all 0.3s ease',

                    // Responsive styling
                    [appliedTheme.breakpoints.down('sm')]: {
                        top: 'auto',
                        bottom: '16px',
                        right: '16px',
                        borderRadius: '50%',
                        padding: '8px',
                    },
                    [appliedTheme.breakpoints.up('sm')]: {
                        top: '50%',
                        right: 0,
                        transform: 'translateY(-50%)',
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        padding: {
                            sm: '10px 6px 10px 10px',
                            md: '12px 8px 12px 12px',
                            lg: '14px 10px 14px 14px',
                        },
                    },
                }}
            >
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <App {...props} mode={mode} />
        </ThemeProvider>
    );
};

export default AppWrapper;
