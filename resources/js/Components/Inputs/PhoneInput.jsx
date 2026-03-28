import React, { useState } from 'react';
import {
    TextField,
    MenuItem,
    InputAdornment,
    Select,
} from '@mui/material';

const countryCodes = [
    { code: '+1', flag: '🇺🇸' },  // USA
    { code: '+44', flag: '🇬🇧' }, // UK
    { code: '+91', flag: '🇮🇳' }, // India
    { code: '+977', flag: '🇳🇵' }, // Nepal
    { code: '+61', flag: '🇦🇺' }, // Australia
    { code: '+92', flag: '🇵🇰' }, // Pakistan
    { code: '+880', flag: '🇧🇩' }, // Bangladesh
];

export const PhoneInput = ({ label, name, required, value, onChange }) => {
    // Set the default country code to Nepal
    const [countryCode, setCountryCode] = useState('+977');

    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;

        // Allow only digits and limit to 10 characters
        if (/^\d{0,10}$/.test(inputValue)) {
            onChange(e); // Update value only if valid
        }
    };

    return (
        <TextField
            fullWidth
            type="tel"
            label={required ? `${label} *` : label}
            name={name}
            value={value}
            onChange={handlePhoneChange}
            required={required}
            error={required && (String(value).length !== 10)}
            helperText={
                required && (String(value).length !== 10) ?
                'Phone number must be exactly 10 digits' :
                ''
            }
            size="small"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            size="small"
                            sx={{ mr: 1, minWidth: 0 }}
                        >
                            {countryCodes.map((country) => (
                                <MenuItem key={country.code} value={country.code}>
                                    {country.flag} {country.code}
                                </MenuItem>
                            ))}
                        </Select>
                    </InputAdornment>
                ),
            }}
        />
    );
};
