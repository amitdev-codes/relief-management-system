import React, { useState } from 'react';
import { Dialog, DialogTitle, Card, CardHeader, CardContent, DialogContent, DialogActions, Snackbar, Button, TextField, Tooltip, Chip, MenuItem, Grid, Box, InputLabel, useMediaQuery, useTheme } from '@mui/material';
import {
    Typography
} from '@mui/material';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';
import useInertiaForm from '@/hooks/loan/master/useInertiaForm';
import DataTable from './DataTable';
import EditLocationAltRoundedIcon from '@mui/icons-material/EditLocationAltRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import StatusSwitchComponent from '@/Components/Mui/StatusSwitchComponent';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const LoanPurposeTypeSetting = ({ data, baseUrl }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));



    const { loanPurposeTypes } = data; // Destructuring the required properties
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const { create, update, destroy, processing } = useInertiaForm(baseUrl);



    const [formData, setFormData] = useState({
        code: '',
        name: '',
        name_np: '',
        description: '',
    });



    const onClose = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    const resetForm = () => {
        setFormData({
            code: '',
            name: '',
            name_np: '',
            description: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            update(editingId, formData);
        } else {
            create(formData);
        }
        setIsModalOpen(false);
        resetForm();
        setEditingId(null);
    };

    const handleEdit = (id) => {
        const itemToEdit = loanPurposeTypes.find(item => item.id === id);
        if (itemToEdit) {
            setFormData(itemToEdit);
            setEditingId(id);
            setIsModalOpen(true);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(id);
            }
        });
    };

    // Define columns with correct valueGetter
    const columns = [
        { field: 'code', headerName: 'कोड', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'name_np', headerName: 'नाम ', flex: 1 },
        { field: 'description', headerName: 'विवरण ', flex: 1 },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditLocationAltRoundedIcon fontSize='small' color="primary" />}
                    onClick={() => handleEdit(params.id)}
                />,
                <GridActionsCellItem
                    icon={<DeleteForeverRoundedIcon fontSize="small" color="error" />}
                    onClick={() => handleDelete(params.id)}
                />,
            ],
        },
    ];

    return (
        <Box className="data-table-container">
            <Card>
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="4px 16px">
                    <Button
                        variant="contained"
                        onClick={() => setIsModalOpen(true)}
                        color="secondary" // Change color as needed
                        size={isXs ? "small" : "medium"}
                        startIcon={<AddIcon />}

                    >
                        नयाँ थप्नुहोस
                    </Button>
                </Box>
                <CardContent>
                    {/* Example of DataTable, you should pass educationalLoanFaculties and columns correctly */}
                    <DataTable
                        userRows={loanPurposeTypes}
                        userColumns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        autoHeight
                    />
                    {/* Dialog for Create/Edit Loan Setting */}
                    <Dialog open={isModalOpen} onClose={onClose} fullWidth maxWidth="md" PaperProps={{ style: { width: '600px' } }}>
                        <DialogTitle>
                            {editingId ? 'Edit Loan Setting' : 'Create New Loan Setting'}
                        </DialogTitle>

                        <DialogContent>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    {/* Code  */}
                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="कोड "
                                            size="small"
                                            value={formData.code}
                                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>

                                    {/* Name  */}
                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            label="Name "
                                            size="small"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>

                                    {/* Name np  */}
                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            label="नाम "
                                            size="small"
                                            value={formData.name_np}
                                            onChange={(e) => setFormData({ ...formData, name_np: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={5}
                                            name="description"
                                            label="कैफियत"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}

                                        />
                                    </Grid>
                                </Grid>

                                {/* Dialog Actions */}
                                <DialogActions>
                                    <Button onClick={onClose} color="secondary">
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={false}  // Set to true when processing
                                    >
                                        {editingId ? 'Update' : 'Create'}
                                    </Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </Box>

    );
};

export default LoanPurposeTypeSetting;
