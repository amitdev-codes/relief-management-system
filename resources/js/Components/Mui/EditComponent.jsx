import React from 'react';
import { Link } from '@inertiajs/react';
import EditLocationAltRoundedIcon from '@mui/icons-material/EditLocationAltRounded';
import { IconButton, Tooltip } from '@mui/material';

const EditComponent = ({ route }) => {
    return (
        <Link href={route} className="action-link">
            <Tooltip title="Edit">
                <IconButton size="small" color="primary">
                    <EditLocationAltRoundedIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Link>
    );
};

export default EditComponent;
