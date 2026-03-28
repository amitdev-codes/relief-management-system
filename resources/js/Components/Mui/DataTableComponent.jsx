import React, { useState, useMemo, Suspense,useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Button,
    IconButton,
    Tooltip,
    Chip,
} from "@mui/material";
import {
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
    DataGrid,
    gridClasses,
} from "@mui/x-data-grid";
import { router as Inertia } from "@inertiajs/react";
import { useTheme, useMediaQuery } from "@mui/material";
import Swal from "sweetalert2";
import {
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    DeleteSweep as BulkDeleteIcon,
    Search as SearchIcon,
    FileDownload as ExportIcon,
    PictureAsPdf as PdfIcon,
    TableView as ExcelIcon,
} from "@mui/icons-material";
import AlertSystem from "@/Components/Mui/AlertSystemComponent";
import ViewFormComponent from "@/Components/Inputs/ViewFormComponent";
import CustomExportButton from "@/Components/Inputs/CustomExportButton";

import "jspdf-autotable";
import User from "@/admin/pages/UserManagement/user/User";
import ReliefPrioritization from "@/admin/pages/Master/reliefPrioritization/ReliefPrioritization";

const DataTableComponent = ({
    columns,
    rows,
    routeName,
    modelName,
    title,
    create = true,
    onDataChange,
    onSearchChange,
    loading,
    formType,
}) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));
    const [selectedRows, setSelectedRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState();
    const [alerts, setAlerts] = useState([]);
    const [formModal, setFormModal] = useState({
        open: false,
        mode: null,
        data: null,
    });

    const formPaths = {
        User: '../../Pages/Backend/User/CreateEdit',
        Permission: '../../Pages/Backend/UserManagement/Permission/CreateEdit',
        ReliefPrioritization: '../../Pages/Backend/ReliefPrioritization/CreateEdit',
    };

    const Form =
        formType === "modal" && formPaths[title]
            ?React.lazy(() => import(formPaths[title]))
            : null;

            console.log(formPaths[title],title);
    const handleFormAction = (mode, data = null) => {
        if (formType === "modal") {
            setFormModal({
                open: true,
                mode,
                data,
            });
        } else {
            // Navigate to dedicated form pages
            const CallBackRoute =
                mode === "edit"
                    ? `admin.${routeName}.edit`
                    : `admin.${routeName}.create`;

            Inertia.get(route(CallBackRoute, mode === "edit" ? data.id : undefined));
        }
    };

    const addAlert = (message, type = "success") => {
        setAlerts((prev) => [...prev, { message, type }]);
        setTimeout(() => setAlerts((prev) => prev.slice(1)), 3000);
    };

    const handleFormSubmit = (formData) => {
        if (formType !== 'modal') return;
        const { mode, data } = formModal;
        const submitRoute =
            mode === "edit"
                ? `admin.${routeName}.update`
                : `admin.${routeName}.store`;

        const options = {
            onSuccess: () => {
                addAlert(`${title} ${mode}d successfully`);
                setFormModal({ open: false, mode: null, data: null });
                onDataChange();
            },
            onError: (error) => {
                addAlert(
                    `Failed to ${mode} ${title}: ${error.message}`,
                    "error"
                );
            },
        };

        mode === "edit"
            ? Inertia.put(route(submitRoute, data.id), formData, options)
            : Inertia.post(route(submitRoute), formData, options);
    };

    // Handle bulk selection
    const handleSelectionChange = (newSelectionModel) => {
        setSelectedRows(newSelectionModel);
    };


    const handleDelete = async (id, isBulk = false) => {
        const result = await Swal.fire({
            title: isBulk
                ? `Delete ${selectedRows.length} items?`
                : "Delete this item?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: theme.palette.error.main,
            cancelButtonColor: theme.palette.grey[500],
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            const deleteRoute = isBulk
                ? `admin.${routeName}.bulk-destroy`
                : `admin.${routeName}.destroy`;

            const deleteData = isBulk ? { ids: selectedRows } : id;

            Inertia.delete(route(deleteRoute, deleteData), {
                preserveScroll: true,
                onSuccess: () => {
                    addAlert(
                        `${title}${isBulk ? "s" : ""} deleted successfully`
                    );
                    if (isBulk) setSelectedRows([]);
                    onDataChange(); // Refresh data after successful deletion
                },
                onError: () => {
                    addAlert(
                        `Failed to delete ${title}${isBulk ? "s" : ""}`,
                        "error"
                    );
                },
            });
        }
    };

    const formattedColumns = useMemo(() => {
        const baseColumns = columns.map((col) => ({
            ...col,
            field: col.field,
            headerName: col.headerName,
            minWidth: 150,
            sortable: true,
            filterable: true,
            type: col.type || "string",
            valueFormatter: (params) => {
                if (col.type === "date") {
                    return new Date(params.value).toLocaleDateString();
                }
                return params.value;
            },
            renderCell: (params) => {
                if (Array.isArray(params.value)) {
                    const displayItems = params.value.slice(0, 3);
                    const remaining = params.value.length - 3;

                    return (
                        <Tooltip title={params.value.join(', ')} enterDelay={500}>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                {displayItems.map((item, idx) => (
                                    <Chip
                                        key={idx}
                                        label={item.name || item}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />
                                ))}
                                {remaining > 0 && (
                                    <Chip
                                        label={`+${remaining} more`}
                                        size="small"
                                        color="default"
                                        variant="outlined"
                                    />
                                )}
                            </Box>
                        </Tooltip>
                    );
                }


                if (col.data === "status") {
                    const isActive = params.row.status === "Active";
                    return (
                        <Chip
                            label={isActive ? "Active" : "Inactive"}
                            color={isActive ? "success" : "error"}
                            size="small"
                        />
                    );
                }
                if (typeof params.value === 'string' && params.value.length > 50) {
                    return (
                        <Tooltip title={params.value} enterDelay={500}>
                            <span>{params.value.substring(0, 50)}...</span>
                        </Tooltip>
                    );
                }
                return params.value;
            },
        }));

        return [
            ...baseColumns,
            {
                field: "actions",
                headerName: "Actions",
                width: 150,
                renderCell: (params) => (
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip title="View">
                        <IconButton
                            size="small"
                            onClick={() => {
                               setFormModal({
                                          open: true,
                                          mode: "view",
                                          data: params.row,
                                      })

                            }}
                            sx={{ color: theme.palette.info.main }}
                        >
                            <ViewIcon />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                        <IconButton
                                size="small"
                                onClick={() => handleFormAction('edit', params.row)}
                                sx={{ color: theme.palette.primary.main }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton
                                size="small"
                                onClick={() => handleDelete(params.row.id)}
                                sx={{ color: theme.palette.error.main }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ),
            },
        ];
    }, [columns,formType]);

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                        gap: 2,
                    }}
                >
                    {/* Left section - Grid features with Quick Search */}
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <GridToolbarFilterButton />
                        <CustomExportButton
                            columns={formattedColumns}
                            rows={rows}
                        />
                    </Box>

                    {/* Center section - Bulk delete */}
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        {selectedRows.length > 0 && (
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<BulkDeleteIcon />}
                                onClick={() => handleDelete(null, true)}
                            >
                                Delete Selected ({selectedRows.length})
                            </Button>
                        )}
                    </Box>

                    {/* Right section -search right side */}
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <GridToolbarQuickFilter
                            debounceMs={300}
                            sx={{
                                width: "250px",
                                "& .MuiInputBase-root": {
                                    height: 40,
                                },
                            }}
                        />
                    </Box>
                </Box>
            </GridToolbarContainer>
        );
    };

    return (
        <>
            <Box sx={{ width: "100%", height: "100%" }}>
                <AlertSystem
                    alerts={alerts}
                    onClose={(index) =>
                        setAlerts((prev) => prev.filter((_, i) => i !== index))
                    }
                />

                {formModal.open && formModal.mode === "view" ? (
                    <ViewFormComponent
                        open={formModal.open}
                        onClose={() =>
                            setFormModal({
                                open: false,
                                mode: null,
                                data: null,
                            })
                        }
                        data={formModal.data}
                        title={modelName}
                        columns={columns}
                        routeName={routeName}
                    />
                ) : (
                    formModal.open && (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Form
                                {...formModal}
                                onClose={() =>
                                    setFormModal({
                                        open: false,
                                        mode: null,
                                        data: null,
                                    })
                                }
                                onSubmit={handleFormSubmit}
                            />
                        </Suspense>
                    )
                )}

                <Card>
                {create && (
                        <Box
                            sx={{
                                p: 2,
                                borderBottom: 1,
                                borderColor: "divider",
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => handleFormAction('create')}
                            >
                                Create New {title}
                            </Button>
                        </Box>
                    )}

                    <CardContent>
                        <DataGrid
                            loading={loading}
                            rows={filteredRows||rows}
                            columns={formattedColumns}
                            autoHeight
                            checkboxSelection
                            disableRowSelectionOnClick={false}
                            selectionModel={selectedRows}
                            onRowSelectionModelChange={handleSelectionChange}
                            slots={{
                                toolbar: CustomToolbar,
                            }}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        page: 0,
                                        pageSize: isXs ? 5 : isXl ? 25 : 10,
                                    },
                                },
                                columns: {
                                    columnVisibilityModel: {
                                        ...Object.fromEntries(
                                            columns
                                                .filter(
                                                    (col) => col.hideOnMobile
                                                )
                                                .map((col) => [
                                                    col.field,
                                                    !isXs,
                                                ])
                                        ),
                                    },
                                },
                            }}
                            onFilterModelChange={(model) => {
                                const searchValue =
                                    model.quickFilterValues?.[0] || "";
                                if (onSearchChange) onSearchChange(searchValue);

                                const filtered = searchValue
                                    ? rows.filter((row) =>
                                          Object.values(row).some((value) =>
                                              String(value)
                                                  .toLowerCase()
                                                  .includes(
                                                      searchValue.toLowerCase()
                                                  )
                                          )
                                      )
                                    : rows;
                                setFilteredRows(filtered);
                            }}
                            pageSizeOptions={
                                isXs
                                    ? [5, 10]
                                    : isXl
                                    ? [10, 25, 50, 100]
                                    : [5, 10, 25, 50]
                            }
                            sx={{
                                [`& .${gridClasses.cell}`]: {
                                    py: 1,
                                },
                                [`& .${gridClasses.row}`]: {
                                    "&:hover": {
                                        backgroundColor:
                                            theme.palette.action.hover,
                                    },
                                    "&.Mui-selected": {
                                        backgroundColor: `${theme.palette.primary.lighter} !important`,
                                    },
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor:
                                        theme.palette.background.neutral,
                                    borderRadius: 1,
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    minHeight: 200,
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    borderTop: `1px solid ${theme.palette.divider}`,
                                },
                            }}
                        />
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};
export default DataTableComponent;
