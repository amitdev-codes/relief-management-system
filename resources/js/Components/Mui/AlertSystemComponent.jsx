import React, { useState } from 'react';
import {
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
const AlertSystem = ({ alerts, onClose }) => {
    return (
      <Box sx={{ position: 'fixed', top: 24, right: 24, zIndex: 2000 }}>
        {alerts.map((alert, index) => (
          <Snackbar
            key={index}
            open={true}
            autoHideDuration={6000}
            onClose={() => onClose(index)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert
              onClose={() => onClose(index)}
              severity={alert.type}
              sx={{ width: '100%', mb: 2 }}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        ))}
      </Box>
    );
  };
export default AlertSystem;
