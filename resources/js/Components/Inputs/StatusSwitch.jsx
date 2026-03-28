import React from 'react';
import {
  Switch,
  FormControlLabel,
} from '@mui/material';
export const StatusSwitch = ({ label, name, checked, onChange }) => (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={onChange}
          name={name}
          color="primary"
          size="small"
        />
      }
      label={label}
    />
  );
