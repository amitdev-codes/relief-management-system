import React from 'react';
import { TextField, Autocomplete } from '@mui/material';

const SearchableDropdown = ({
    options,
    value,
    onChange,
    label,
    error,
    errorMessage,
    targetName
}) => {
    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => `${option.name} - ${option.name_np}`}
            value={options.find(option => option.id === value) || null}
            onChange={(event, newValue) => {
                onChange({
                    target: { name: targetName, value: newValue ? newValue.id : '' }
                });
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    size="small"
                    fullWidth
                    label={label}
                    error={!!error}
                    helperText={error ? errorMessage : ''}
                    InputLabelProps={{
                        sx: {
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                        },
                    }}
                />
            )}
        />
    );
};

export default SearchableDropdown;
