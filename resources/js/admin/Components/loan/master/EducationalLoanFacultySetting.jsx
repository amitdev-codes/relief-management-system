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
const EducationalLoanFacultySetting = ({ data, baseUrl }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));



    const { educationalLoanFaculties, faculties, edu_level } = data; // Destructuring the required properties
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const { create, update, destroy, processing } = useInertiaForm(baseUrl);



    const [formData, setFormData] = useState({
        code: '',
        faculty_id: '',
        education_level_id: '',
        loan_amount: '',
    });



    const onClose = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    const resetForm = () => {
        setFormData({
            code: '',
            faculty_id: '',
            education_level_id: '',
            loan_amount: ''
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
        const itemToEdit = educationalLoanFaculties.find(item => item.id === id);
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
        {
            field: 'faculty_id',
            headerName: 'शिक्षक संकाय',
            flex: 1,
            valueGetter: (params) => {
                const edufaculties = faculties.find(source => source.id == params);
                return edufaculties ? edufaculties.name_np : 'Unknown';
            }

        },

        {
            field: 'education_level_id',
            headerName: 'तह ',
            flex: 1,
            valueGetter: (params) => {
                const edu_levels = edu_level.find(source => source.id == params);
                return edu_levels ? edu_levels.name_np : 'Unknown';
            }

        },
        { field: 'loan_amount', headerName: 'ऋण', flex: 1 },
        {
            field: 'status', headerName: 'स्थिति', flex: 1,
            renderCell: (params) => (
                <Tooltip title={params.value ? "सक्रिय" : "निस्क्रिय"} enterDelay={500} leaveDelay={200}>
                    <Chip
                        label={params.value ? "सक्रिय" : "निस्क्रिय"}
                        color={params.value ? "success" : "error"}
                        className={`status-chip ${params.value ? 'active' : 'inactive'}`}
                        size="small"
                    />
                </Tooltip>
            )
        },
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
                        userRows={educationalLoanFaculties}
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
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="कोड "
                                            size="small"
                                            value={formData.code}
                                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>


                                    {/* Educational Loan faculty */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="शैक्षिक संकाय"
                                            select
                                            size="small"
                                            value={formData.faculty_id}
                                            onChange={(e) => setFormData({ ...formData, faculty_id: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        >
                                            {faculties.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name_np}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    {/* Loan Purpose Type */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="तह"
                                            select
                                            size="small"
                                            value={formData.education_level_id}
                                            onChange={(e) => setFormData({ ...formData, education_level_id: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        >
                                            {edu_level.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name_np}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>



                                    {/* Loan amount*/}
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="ऋण रकम"
                                            size="small"
                                            type='number'
                                            value={formData.loan_amount}
                                            onChange={(e) => setFormData({ ...formData, loan_amount: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>

                                    {/* Status */}


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

export default EducationalLoanFacultySetting;
