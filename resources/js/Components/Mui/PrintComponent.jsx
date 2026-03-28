import React from 'react';
import { Link } from '@inertiajs/react';
import { IconButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/PrintOutlined';

const PrintComponent = ({ route }) => {
    return (
        <Link href={route} className="action-link">
            <IconButton size="small" color="default">
                <PrintIcon fontSize="small" />
            </IconButton>
        </Link>
    );
};

export default PrintComponent;
