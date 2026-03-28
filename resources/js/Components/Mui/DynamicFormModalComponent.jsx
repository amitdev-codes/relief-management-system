import React, { useState } from "react";
import {
    Box,
    IconButton,
    useTheme,
    useMediaQuery,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper,
} from "@mui/material";
import {
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    DeleteSweep as BulkDeleteIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
const DynamicFormModal = ({
    open,
    onClose,
    formType,
    mode,
    data,
    title,
    onSubmit,
    children,
}) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));

    // Determine if we should show as modal or full form
    const isModalView = formType === "modal" || isXs;

    if (isModalView) {
        return (
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {title}
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2 }}>
                        {children} {/* Render form fields here */}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                    <Button
                        onClick={() => {
                            onSubmit();
                            onClose(); // Optionally close the modal after submission
                        }}
                        variant="contained"
                        color="primary"
                    >
                        {mode === "create" ? "Create" : "Update"}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 3, m: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <h2>{title}</h2>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box sx={{ p: 2 }}>
                {children} {/* Render form fields here */}
            </Box>
            {/* <FormContent /> */}
            <Box
                sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                }}
            >
                <Button onClick={onClose}>Close</Button>
                {mode !== "view" && (
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                        color="primary"
                    >
                        {mode === "create" ? "Create" : "Update"}
                    </Button>
                )}
            </Box>
        </Paper>
    );
};

export default DynamicFormModal;
