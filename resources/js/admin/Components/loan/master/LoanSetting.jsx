import React, { useState } from 'react';
import { Dialog, DialogTitle, Card, CardHeader, CardContent, DialogContent, DialogActions, Snackbar, Button, TextField, MenuItem, Grid, Box, InputLabel, useMediaQuery, useTheme } from '@mui/material';
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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const LoanSetting = ({ data, baseUrl }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));

    const { loanSettings, fiscalYears, loanPurposeTypes } = data; // Destructuring the required properties
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const { create, update, destroy, processing } = useInertiaForm(baseUrl);
    // Snackbar state
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');



    const [formData, setFormData] = useState({
        fiscal_year_id: '',
        loan_purpose_type_id: '',
        interest_rate: '',
        fine_interest: '',
        loan_repayment_period: '',
    });



    const onClose = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    const resetForm = () => {
        setFormData({
            fiscal_year_id: '',
            loan_purpose_type_id: '',
            interest_rate: '',
            fine_interest: '',
            loan_repayment_period: '',
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
        const itemToEdit = loanSettings.find(item => item.id === id);
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
        {
            field: 'fiscal_year_id',
            headerName: 'आर्थिक वर्ष ',
            flex: 1,
            valueGetter: (params) => {
                const fiscal_year = fiscalYears.find(source => source.id == params);
                return fiscal_year ? fiscal_year.code : 'Unknown';
            }
        },
        {
            field: 'loan_purpose_type_id',
            headerName: 'ऋणको उद्देस्य ',
            flex: 1,
            valueGetter: (params) => {
                const purposeType = loanPurposeTypes.find(source => source.id == params);
                return purposeType ? purposeType.name_np : 'Unknown';
            }
        },
        { field: 'interest_rate', headerName: 'ब्याजदर', flex: 1 },
        { field: 'fine_interest', headerName: 'जुर्माना ब्याजदर ', flex: 1 },
        { field: 'loan_repayment_period', headerName: 'ऋण फिर्ता अवधि ', flex: 1 },
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
                    {/* Example of DataTable, you should pass loanSettings and columns correctly */}
                    <DataTable
                        userRows={loanSettings}
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
                                    {/* Fiscal Year Select */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Fiscal Year"
                                            select
                                            size="small"
                                            value={formData.fiscal_year_id}
                                            onChange={(e) => setFormData({ ...formData, fiscal_year_id: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        >
                                            {fiscalYears.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.code}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    {/* Loan Purpose Type */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Loan Purpose Type"
                                            select
                                            size="small"
                                            value={formData.loan_purpose_type_id}
                                            onChange={(e) => setFormData({ ...formData, loan_purpose_type_id: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        >
                                            {loanPurposeTypes.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    {/* Interest Rate */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Interest Rate"
                                            size="small"
                                            value={formData.interest_rate}
                                            onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>

                                    {/* Fine Interest */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Fine Interest"
                                            size="small"
                                            value={formData.fine_interest}
                                            onChange={(e) => setFormData({ ...formData, fine_interest: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>

                                    {/* Loan Repayment Period */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Loan Repayment Period"
                                            size="small"
                                            value={formData.loan_repayment_period}
                                            onChange={(e) => setFormData({ ...formData, loan_repayment_period: e.target.value })}
                                            fullWidth
                                            margin="normal"
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

export default LoanSetting;
