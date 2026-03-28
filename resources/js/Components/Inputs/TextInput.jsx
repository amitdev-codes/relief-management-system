import React, { useState } from 'react';
import {
  TextField, Modal, Box, Typography, Button,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

// Enhanced Text Input with different types
export const TextInput = ({ label, name, required, value, onChange, type = 'text' }) => {
  const validateInput = (value) => {
    if (!value && required) return 'This field is required';

    switch (type) {
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : '';
      case 'url':
        return !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value) ? 'Invalid URL' : '';
      case 'tel':
        return !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value) ? 'Invalid phone format' : '';
      default:
        return '';
    }
  };

  const error = validateInput(value);

  return (
    <TextField
      fullWidth
      type={type}
      label={required ? `${label} *` : label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      error={!!error}
      helperText={error}
      size="small"
    />
  );
};
