import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link, router } from '@inertiajs/react';
import EditLocationAltRoundedIcon from '@mui/icons-material/EditLocationAltRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import PrintIcon from '@mui/icons-material/PrintOutlined';
import { IconButton, Box, Card, CardHeader, CardContent, Typography, Button, useTheme, Tooltip, Chip, useMediaQuery } from '@mui/material';
import Swal from 'sweetalert2';
import './dataTable.scss';
import AddIcon from '@mui/icons-material/Add';
import { purple, red } from '@mui/material/colors';
import CreateComponent from '@/Components/Mui/CreateComponent';
import DeleteComponent from '@/Components/Mui/DeleteComponent';
import EditComponent from '@/Components/Mui/EditComponent';
import PrintComponent from '@/Components/Mui/PrintComponent';
import InvoiceComponent from '../InvoiceComponent';

const LoanStatusEnum = {
    APPROVED: 'APPROVED',
    APPLIED: 'APPLIED',
    CURRENT: 'CURRENT',
    OVERDUE: 'OVERDUE',
    COMPLETED: 'COMPLETED',
    PARTIALLY: 'PARTIALLY',
};

const accent = purple['A500'];

const LoanStatusLabels = {
    [LoanStatusEnum.APPROVED]: {
        label: "ऋण स्वीकृत",
        color: "success",
    },
    [LoanStatusEnum.APPLIED]: {
        label: "ऋण आवेदन",
        color: "primary",
    },
    [LoanStatusEnum.CURRENT]: {
        label: "सक्रिय",
        color: "success",
    },
    [LoanStatusEnum.OVERDUE]: {
        label: "निस्क्रिय",
        color: "error",
    },
    [LoanStatusEnum.COMPLETED]: {
        label: "पूर्ण चुक्ता",
        color: "success",
    },
    [LoanStatusEnum.PARTIALLY]: {
        label: "आंशिक चुक्ता",
        color: "warning",
    },
};

const DataTable = (props) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));

    const columns = props.userColumns.map((column) => ({
        ...column,
        renderCell: (params) => {
            if (column.field === "status") {
                return (
                    <Tooltip title={params.value} enterDelay={500} leaveDelay={200}>
                        <Chip
                            label={params.row.status ? "सक्रिय" : "निस्क्रिय"}
                            color={params.row.status ? "success" : "error"}
                            className={`status-chip ${params.row.status ? 'active' : 'inactive'}`}
                            size="small"
                        />
                    </Tooltip>
                );
            }
            if (column.field === "loan_status") {
                const loanStatus = params.row.loan_status.toUpperCase();
                const statusInfo = LoanStatusLabels[loanStatus];
                return (
                    <Tooltip title={params.label} enterDelay={500} leaveDelay={200}>
                        <Chip
                            label={statusInfo.label}
                            color={statusInfo.color}
                            className={`status-chip ${statusInfo.color}`}
                            size="small"
                        />
                    </Tooltip>
                );
            }

            return (
                <Tooltip title={params.value} enterDelay={500} leaveDelay={200}>
                    <div className="cell-content">{params.value}</div>
                </Tooltip>
            );
        },
    }));

    return (
        <Box className="data-table-container">
            <Card>
                {props.create && (<CreateComponent title={props.title} route={route(`${props.route}.create`)} />)}

                <CardContent>
                    <DataGrid
                        rows={props.userRows}
                        columns={[
                            ...columns,
                            {
                                field: 'actions',
                                headerName: 'Actions',
                                flex: 1,
                                renderCell: (params) => (
                                    <Box className="action-buttons">
                                        <EditComponent route={route(`${props.route}.edit`, params.row.id)} />
                                        <DeleteComponent route={route(`${props.route}.destroy`, params.row.id)} />
                                    </Box>
                                ),
                            },
                        ]}
                        autoHeight
                        autowidth
                        getRowHeight={() => 'auto'}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: isXs ? 5 : isXl ? 25 : 10 }
                            },
                        }}
                        slots={{
                            toolbar: isXs ? null : GridToolbar,
                        }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            },
                        }}
                        pageSizeOptions={isXs ? [5, 10] : isXl ? [10, 25, 50, 100] : [5, 10, 25, 50]}
                        checkboxSelection={!isXs}
                        disableRowSelectionOnClick
                        disableColumnSelector={isXs}
                        disableDensitySelector={isXs}
                        className={`data-grid ${isXs ? 'xs' : isSm ? 'sm' : isMd ? 'md' : isLg ? 'lg' : 'xl'}`}
                    />

                </CardContent>
            </Card>
        </Box>
    );
}

export default DataTable;
