// components/RemarksSection.js
import React from 'react';
import { Grid, TextField } from '@mui/material';

const RemarksSection = ({ remarks, handleChange, errors }) => {
    return (
        <Grid item xs={12}>
            <TextField
                fullWidth
                multiline
                rows={5}
                name="remarks"
                label="कैफियत"
                value={remarks}
                onChange={handleChange}
                error={!!errors.remarks}
                helperText={errors.remarks}
            />
        </Grid>
    );
};

export default RemarksSection;
