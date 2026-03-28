import React from 'react';
import { TextField, useMediaQuery, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';

const ResponsiveDatePicker = ({ label, value, onChange }) => {
    const theme = useTheme();
    const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const isSmall = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMedium = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLarge = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isExtraLarge = useMediaQuery(theme.breakpoints.up('xl'));

    const getDatePickerWidth = () => {
        if (isExtraSmall) return '100%';
        if (isSmall) return '300px';
        if (isMedium) return '350px';
        if (isLarge) return '400px';
        if (isExtraLarge) return '450px';
        return '400px'; // default fallback
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '100vw',
                overflow: 'hidden'
            }}>
                <DatePicker
                    label={label}
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{
                                marginTop: isExtraSmall ? '10px' : '0', // Add margin if necessary
                                marginBottom: '10px', // Ensure some space below
                                '& .MuiInputBase-root': {
                                    fontSize: isExtraLarge ? '1.2rem' : 'inherit',
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: isExtraLarge ? '1.2rem' : 'inherit',
                                    marginTop: '8px', // Adjust label position
                                },
                            }}
                        />
                    )}
                    slotProps={{ field: { size: 'small' } }}
                    sx={{
                        width: getDatePickerWidth(),
                        maxWidth: '100%',
                        '& .MuiInputBase-root': {
                            fontSize: isExtraLarge ? '1.2rem' : 'inherit',
                        },
                        '& .MuiInputLabel-root': {
                            fontSize: isExtraLarge ? '1.2rem' : 'inherit',
                        },
                    }}
                />
            </Box>
        </LocalizationProvider>
    );
};

export default ResponsiveDatePicker;
