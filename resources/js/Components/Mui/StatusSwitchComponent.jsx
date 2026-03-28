import React from 'react';
import { Switch, FormControlLabel, Typography } from '@mui/material';

const StatusSwitchComponent = ({ checked, handleStatusChange, name }) => {
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={checked}
                    onChange={handleStatusChange}
                />
            }
            label={
                <Typography variant="body1" >
                    {name}
                </Typography>
            }
        />
    );
};

export default StatusSwitchComponent;
