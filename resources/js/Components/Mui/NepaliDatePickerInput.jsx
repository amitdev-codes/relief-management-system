import { useState, useEffect } from 'react';
import { Box, InputLabel, useTheme } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { NepaliDateConverter, NepaliDatePicker } from 'react-nepali-date-picker-lite';

const NepaliDatePickerInput = ({ formName, value, handleDateChange, error }) => {
    const theme = useTheme();
    const today = NepaliDateConverter.getNepaliDate();
    const [selectedDate, setSelectedDate] = useState(value || today);

    const handleChange = (date) => {
        setSelectedDate(date);
        handleDateChange(date);
    };

    useEffect(() => {
        if (value) {
            setSelectedDate(value);
        }
    }, [value]);

    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                '& .nepali-date-picker': {
                    width: '100%',
                },
                '& .nepali-date-picker input': {
                    width: '100%',
                    height: '40px',
                    padding: '8.5px 14px',
                    paddingRight: '36px',
                    fontSize: '0.875rem',
                    borderRadius: '4px',
                    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'}`,
                    transition: 'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    backgroundColor: isDarkMode ? theme.palette.background.paper : 'inherit',
                    color: theme.palette.text.primary,
                    '&:focus': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
                    },
                },
                '& .calendar-icon': {
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: theme.palette.text.secondary,
                },
                '& .nepali-date-picker select': {
                    width: '100%',
                    height: '40px',
                    padding: '0 10px',
                    fontSize: '0.875rem',
                    borderRadius: '4px',
                    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'}`,
                    marginBottom: '10px',
                    backgroundColor: isDarkMode ? theme.palette.background.paper : 'inherit',
                    color: theme.palette.text.primary,
                },
                // Updated styles for the date picker popup
                '& .nepali-date-picker .calendar': {
                    backgroundColor: isDarkMode ? theme.palette.background.paper : theme.palette.background.default,
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.divider,
                },
                '& .nepali-date-picker .calendar .header': {
                    backgroundColor: isDarkMode ? theme.palette.background.paper : theme.palette.background.default,
                    color: theme.palette.text.primary,
                },
                '& .nepali-date-picker .calendar .days .day': {
                    color: theme.palette.text.primary,
                },
                '& .nepali-date-picker .calendar .days .day:not(.disabled):hover': {
                    backgroundColor: theme.palette.action.hover,
                },
                '& .nepali-date-picker .calendar .days .day.selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                },
                '& .nepali-date-picker .calendar .days .day.today': {
                    borderColor: theme.palette.primary.main,
                },
                '& .nepali-date-picker .calendar .month-year-select select': {
                    backgroundColor: isDarkMode ? theme.palette.background.paper : theme.palette.background.default,
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.divider,
                },
            }}
        >
            <InputLabel
                shrink
                sx={{
                    position: 'absolute',
                    top: '-8px',
                    left: '14px',
                    backgroundColor: theme.palette.background.default,
                    padding: '0 4px',
                    fontSize: '0.75rem',
                    color: theme.palette.text.secondary,
                    transform: 'translateY(-50%)',
                    transformOrigin: 'left top',
                }}
            >
                {formName}
                <span style={{ color: theme.palette.error.main }}>*</span>
            </InputLabel>

            <NepaliDatePicker
                value={selectedDate}
                onSelect={handleChange}
                renderInput={(props) => (
                    <input
                        type="text"
                        {...props}
                        style={{
                            width: '100%',
                            height: '40px',
                            padding: '8.5px 14px',
                            paddingRight: '36px',
                            fontSize: '0.875rem',
                            borderRadius: '4px',
                            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'}`,
                            backgroundColor: isDarkMode ? theme.palette.background.paper : 'inherit',
                            color: theme.palette.text.primary,
                        }}
                    />
                )}

                className="nepali-date-picker"
            />
            <CalendarTodayIcon className="calendar-icon" fontSize="small" />
        </Box>
    );
};

export default NepaliDatePickerInput;
