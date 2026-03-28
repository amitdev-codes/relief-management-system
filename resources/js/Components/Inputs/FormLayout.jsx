import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
export const FormLayout = ({ children }) => (
    <Grid container spacing={2}>
      {React.Children.map(children, (child) => (
        <Grid item xs={12} sm={6}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
