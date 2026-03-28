import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link, router } from '@inertiajs/react';
import EditLocationAltRoundedIcon from '@mui/icons-material/EditLocationAltRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import PrintIcon from '@mui/icons-material/PrintOutlined';
import { IconButton, Box, Card, CardHeader, CardContent, Typography, Button, useTheme, Tooltip, Chip, useMediaQuery } from '@mui/material';
import '../../../Components/dataTable/dataTable.scss';
import AddIcon from '@mui/icons-material/Add';



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
            return (
                <Tooltip title={params.value} enterDelay={500} leaveDelay={200}>
                    <div className="cell-content">{params.value}</div>
                </Tooltip>
            );
        },
    }));

    return (

                    <DataGrid
                        rows={props.userRows}
                        columns={props.userColumns}
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


    );
}

export default DataTable;
