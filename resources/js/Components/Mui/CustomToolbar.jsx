// CustomToolbar.js
import React from 'react';
import { Toolbar, Typography, TextField } from '@mui/material';

const CustomToolbar = ({ searchValue, onSearchChange }) => {
    return (
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                User List
            </Typography>
            <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                value={searchValue}
                onChange={onSearchChange}
            />
        </Toolbar>
    );
};

export default CustomToolbar;
