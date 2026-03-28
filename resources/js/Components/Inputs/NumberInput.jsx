import React from 'react';
import {
  TextField,
} from '@mui/material';

export const NumberInput = ({ label, name, required, value, onChange }) => (
    <TextField
      fullWidth
      type="number"
      label={required ? `${label} *` : label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      error={required && !value}
      helperText={required && !value ? 'This field is required' : ''}
      size="small"
    />
  );
