import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link, router } from '@inertiajs/react';
import EditLocationAltRoundedIcon from '@mui/icons-material/EditLocationAltRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import PrintIcon from '@mui/icons-material/PrintOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Swal from 'sweetalert2';
import toastr from 'toastr';
import { IconButton, Box, Card, CardHeader, CardContent, Typography, Button, useTheme, Tooltip, Chip, useMediaQuery } from '@mui/material';
import PersonalLedgerModal from './personalLedger'; // Import the modal component

const DataTable = (props) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));
    const [openLedger, setOpenLedger] = useState(false);
    const [ledgerData, setLedgerData] = useState([]);

    const handleOpenLedger = async (row) => {
        const response = await fetch(`/api/personalLedger/${row.id}`);
        const fetchedLedgerData = await response.json();
        setLedgerData(fetchedLedgerData);
        setOpenLedger(true);
    };

    // Define columns with action column first
    const columns = [
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (params) => (

                <IconButton
                    onClick={() => handleOpenLedger(params.row)}
                    size="small"
                    color="default"
                >
                    <PersonOutlineIcon fontSize="small" />
                </IconButton>
            ),
        },
        ...props.userColumns.map((column) => ({
            ...column,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.value} enterDelay={500} leaveDelay={200}>
                        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', width: '100%' }}>
                            {params.value}
                        </div>
                    </Tooltip>
                );
            },
        }))
    ];

    return (
        <Box className="data-table-container">
            <Card>
                <CardContent >
                    <DataGrid
                        rows={props.userRows}
                        columns={columns}
                        autoHeight
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
                        disableColumnMenu={isXs}
                        disableColumnFilter={isXs}
                        disableColumnSelector={isXs}
                        disableDensitySelector={isXs}
                        className={`data-grid ${isXs ? 'xs' : isSm ? 'sm' : isMd ? 'md' : isLg ? 'lg' : 'xl'}`}
                    />
                    <PersonalLedgerModal
                        open={openLedger}
                        onClose={() => setOpenLedger(false)}
                        data={ledgerData}
                    />
                </CardContent>
            </Card>
        </Box>
    );
}

export default DataTable;
