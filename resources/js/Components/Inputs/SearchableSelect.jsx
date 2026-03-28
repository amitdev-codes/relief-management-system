import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput
} from '@mui/material';
import { Visibility, VisibilityOff, Search } from '@mui/icons-material';
export const SearchableSelect = ({ label, name, required, value, onChange, options }) => {
    const [searchTerm, setSearchTerm] = useState('');



    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) || option.value === value
    );

    return (
      <FormControl fullWidth size="small">
        <InputLabel required={required}>{label}</InputLabel>
        <Select
          value={value}
          onChange={(e) => onChange({ target: { name, value: e.target.value } })}
          input={<OutlinedInput label={required ? `${label} *` : label} />}
          required={required}
          error={required && !value}
          sx={{
            '& .MuiSelect-select': {
              color: value ? 'blue' : 'inherit',
            },
          }}
        >
          <MenuItem disabled>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </MenuItem>
          {filteredOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
};
