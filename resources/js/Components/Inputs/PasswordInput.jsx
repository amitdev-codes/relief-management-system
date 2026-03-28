import React, { useState } from 'react';
import {
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
export const PasswordInput = ({ label, name, required, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <TextField
        fullWidth
        type={showPassword ? 'text' : 'password'}
        label={required ? `${label} *` : label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        error={required && !value}
        helperText={required && !value ? 'This field is required' : ''}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  };
