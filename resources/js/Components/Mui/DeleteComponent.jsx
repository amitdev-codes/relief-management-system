import React from 'react';
import { Link, router } from '@inertiajs/react';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { IconButton, Box, useTheme } from '@mui/material';
import Swal from 'sweetalert2';

const DeleteComponent = ({ route }) => {
    const theme = useTheme();

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: theme.palette.primary.main,
            cancelButtonColor: theme.palette.error.main,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route);
                Swal.fire(`${title} deleted successfully`, '', 'success');
            }
        });
    };

    return (
        <IconButton
            onClick={handleDelete}
            size="small"
            color="error"
        >
            <DeleteForeverRoundedIcon fontSize="small" />
        </IconButton>
    );
};

export default DeleteComponent;
