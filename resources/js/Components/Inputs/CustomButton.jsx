import React from 'react';
import {
  Button
} from '@mui/material';

export const CustomButton = ({ variant = 'contained', color = 'primary', onClick, children }) => (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      size="small"
      sx={{
        textTransform: 'none',
      }}
    >
      {children}
    </Button>
  );
