import React, { useEffect, useState } from 'react';
import { DatePicker as NepaliDatePicker } from 'react-nepali-datetime-picker';
import 'react-nepali-datetime-picker/dist/style.css';
import { Box, InputLabel, TextField, IconButton, useTheme } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const DatePicker = ({ formName, value, handleDateChange, error, label }) => {
    const theme = useTheme();
    const today = new Date(); // Replace with NepaliDateConverter.getNepaliDate() if available
    const [selectedDate, setSelectedDate] = useState(value || today);
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (date) => {
        setSelectedDate(date);
        handleDateChange(date);
        setIsOpen(false);
    };

    useEffect(() => {
        if (value) {
            setSelectedDate(value);
        }
    }, [value]);

    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box className="relative">
            <InputLabel htmlFor={formName} error={error} className="mb-1">
                {label}
            </InputLabel>
            <TextField
                id={formName}
                value={selectedDate ? selectedDate.toString() : ''}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <IconButton onClick={() => setIsOpen(!isOpen)}>
                            <CalendarTodayIcon />
                        </IconButton>
                    ),
                }}
                fullWidth
                error={error}
                onClick={() => setIsOpen(!isOpen)}
                className="mb-1"
            />
            {isOpen && (
                <Box
                    className={`absolute z-10 mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 ${isDarkMode ? 'nedt-dark' : ''
                        }`}
                >
                    <NepaliDatePicker
                        value={selectedDate}
                        onChange={handleChange}
                        className="!w-full"
                    />
                </Box>
            )}
        </Box>
    );
};

export default DatePicker;
