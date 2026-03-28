import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Grid } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import NepaliDatePickerInput from '@/Components/Mui/NepaliDatePickerInput';
import FetchConvertedDate from '@/helper/FetchConvertedDate';


const ReimbursementDetailModal = ({
    formState,
    open,
    onClose,
    onSave,
    detail,
    installmentPeriods,
    fiscalYears,
    loan_allocation_id,
    editingPaymentReimbursementDetail,
    setPaymentReimbursementDetails,
    handleSubmit,
    PaymentReimbursement
}) => {
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [localFormState, setLocalFormState] = useState(formState);

    useEffect(() => {
        if (detail) {
            setLocalFormState(detail);
        } else {
            setLocalFormState(formState);
        }
    }, [detail, formState]);
    const validateForm = () => {
        const requiredFields = [
            'fiscal_year_id', 'loan_distribution_date_bs', 'loan_approved_amount',
            'installment_id', 'installment_percentage', 'installment_amount',
            'installment_due_date_bs'
        ];
        const newErrors = {};
        requiredFields.forEach(field => {
            if (!localFormState[field]) newErrors[field] = 'Required';
        });
        return newErrors;
    };


    const fetchInstallmentDetails = useCallback(async (loan_allocation_id, installment_percentage, installment_id) => {
        try {
            const response = await fetch(`/admin/fetchRemibursementAmount/${loan_allocation_id}/${installment_percentage}/${installment_id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching installment details:', error);
            throw error;
        }
    }, []);



    const updateInstallmentData = useCallback(async () => {
        if (localFormState.installment_id && localFormState.installment_percentage && loan_allocation_id) {
            try {
                const installmentData = await fetchInstallmentDetails(
                    loan_allocation_id,
                    localFormState.installment_percentage,
                    localFormState.installment_id
                );
                setLocalFormState(prev => ({
                    ...prev,
                    installment_amount: installmentData.installment_amount,
                    loan_distribution_date_bs: installmentData.loan_distribution_date_bs,
                    loan_distribution_date: FetchConvertedDate.getConvertedDateBS2AD(installmentData.loan_distribution_date_bs),

                }));
            } catch (error) {
                setSnackbarMessage(`Error updating installment data: ${error.message}`);
                setSnackbarOpen(true);
            }
        }
    }, [localFormState.installment_id, localFormState.installment_percentage, loan_allocation_id, fetchInstallmentDetails]);

    useEffect(() => {
        updateInstallmentData();
    }, [localFormState.installment_id, localFormState.installment_percentage, loan_allocation_id]);

    const handleLocalChange = (e) => {
        const { name, value } = e.target;
        setLocalFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleLocalDateChange = async (name, value) => {
        if (name === 'installment_due_date_bs') {
            // Assuming FetchConvertedDate.getConvertedDateBS2AD is an async function
            const convertedDate = await FetchConvertedDate.getConvertedDateBS2AD(value);
            // Update the local form state with the converted date
            setLocalFormState(prev => ({
                ...prev,
                [name]: value, // Setting the original BS date
                installment_due_date: convertedDate // Setting the converted AD date
            }));
        } else if (name === 'loan_distribution_date_bs') {
            const loan_distribution_date = await FetchConvertedDate.getConvertedDateBS2AD(value);
            // Update the local form state with the converted date
            setLocalFormState(prev => ({
                ...prev,
                [name]: value, // Setting the original BS date
                loan_distribution_date: loan_distribution_date // Setting the converted AD date
            }));
        } else {
            // Handle other form inputs as usual
            setLocalFormState(prev => ({ ...prev, [name]: value }));
        }
    };


    const handleSubmitLocal = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSnackbarMessage('Please fill in all required fields.');
            setSnackbarOpen(true);
            return;
        }
        setErrors({});
        const dataToSave = {
            ...localFormState,
        };
        handleSubmit({
            ...dataToSave,
        })

        setPaymentReimbursementDetails(prevDetails => {
            if (editingPaymentReimbursementDetail) {
                return prevDetails.map(d => d.id === editingPaymentReimbursementDetail.id ? dataToSave : d);
            } else {
                return [...prevDetails, { ...dataToSave, id: Date.now() }]; // Temporary ID for new items
            }
        });

        onClose();
    };


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" PaperProps={{ style: { width: '700px' } }}>
            <DialogTitle>{editingPaymentReimbursementDetail ? 'Edit Payment Detail' : 'Add Payment Detail'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            size="small"
                            fullWidth
                            margin="normal"
                            name="fiscal_year_id"
                            label="आर्थिक वर्ष "
                            value={localFormState.fiscal_year_id || ''}
                            onChange={handleLocalChange}
                            error={!!errors.fiscal_year_id}
                            helperText={errors.fiscal_year_id}
                            required
                        >
                            {fiscalYears.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.code}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            name="loan_approved_amount"
                            label="स्वीकृत ऋण"
                            value={localFormState.loan_approved_amount || ''}
                            onChange={handleLocalChange}
                            error={!!errors.loan_approved_amount}
                            helperText={errors.loan_approved_amount}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            size="small"
                            fullWidth
                            margin="normal"
                            name="installment_id"
                            label="किस्ता"
                            value={localFormState.installment_id || ''}
                            onChange={handleLocalChange}
                            error={!!errors.installment_id}
                            helperText={errors.installment_id}
                            required
                        >
                            {installmentPeriods.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}--{option.name_np}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            name="installment_percentage"
                            label="किस्ता रकम प्रतिसत "
                            value={localFormState.installment_percentage || ''}
                            onChange={handleLocalChange}
                            error={!!errors.installment_percentage}
                            helperText={errors.installment_percentage}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            name="installment_amount"
                            label="किस्ता  रकम "
                            value={localFormState.installment_amount || ''}
                            onChange={handleLocalChange}
                            error={!!errors.installment_amount}
                            helperText={errors.installment_amount}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} mt={2}>
                        <NepaliDatePickerInput
                            formName="ऋण उपलब्ध मिति"
                            value={localFormState.loan_distribution_date_bs || ''}
                            handleDateChange={(date) => handleLocalDateChange('loan_distribution_date_bs', date)}
                            error={errors.loan_distribution_date_bs}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} mt={2}>
                        <NepaliDatePickerInput
                            formName="ऋण फिर्ता मिति"
                            value={localFormState.installment_due_date_bs || ''}
                            handleDateChange={(date) => handleLocalDateChange('installment_due_date_bs', date)}
                            error={errors.installment_due_date_bs}
                            required
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmitLocal} color="primary">
                    {editingPaymentReimbursementDetail ? 'Update' : 'Add'}
                </Button>
            </DialogActions>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default ReimbursementDetailModal;
