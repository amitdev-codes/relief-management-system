import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
    Paper,
    Box,
    IconButton,
    Divider,
    Avatar,
    useTheme
} from '@mui/material';
import {
    Close as CloseIcon,
    ArrowBack as BackIcon
} from '@mui/icons-material';
import { Link } from '@inertiajs/react';

const ViewFormComponent = ({ open, onClose, data, title, columns,routeName }) => {
    const theme = useTheme();

    const renderValue = (column, value) => {
        switch (column.type) {
            case 'image':
                return (
                    <Avatar
                        src={value}
                        alt={column.headerName}
                        sx={{ width: 100, height: 100 }}
                        variant="rounded"
                    />
                );
            case 'status':
                return (
                    <Box
                        sx={{
                            backgroundColor: value ? 'success.light' : 'error.light',
                            color: value ? 'success.dark' : 'error.dark',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            display: 'inline-block'
                        }}
                    >
                        {value ? 'Active' : 'Inactive'}
                    </Box>
                );
            case 'date':
                return new Date(value).toLocaleDateString();
            case 'boolean':
                return value ? 'Yes' : 'No';
            default:
                return value || '-';
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    boxShadow: theme.shadows[5]
                }
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    p: 2
                }}
            >
                <IconButton
                        edge="start"
                        component={Link}
                        href={route(`admin.${routeName}.index`)}
                        sx={{ color: 'inherit' }}
                >
                    <BackIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title} Details
                </Typography>
                <IconButton
                    edge="end"
                    onClick={onClose}
                    sx={{ color: 'inherit' }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    {columns.map((column, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    bgcolor: 'background.default',
                                    borderRadius: 2
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {column.headerName}
                                </Typography>
                                <Typography variant="body1">
                                    {renderValue(column, data[column.field])}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    startIcon={<CloseIcon />}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewFormComponent;
