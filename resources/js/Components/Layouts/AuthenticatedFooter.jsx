import React from "react";
import { Box, Typography } from "@mui/material";

const AuthenticatedFooter = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[200],
                color: (theme) =>
                    theme.palette.mode === "dark" ? theme.palette.grey[400] : theme.palette.text.primary,
                textAlign: "center",
                py: 2,
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                height: { xs: '56px', sm: '64px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: (theme) => theme.zIndex.appBar - 1,
                borderTop: "1px solid",
                borderColor: (theme) =>
                    theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[300],
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} Company Name. All rights reserved.
            </Typography>
        </Box>
    );
};

export default AuthenticatedFooter;
