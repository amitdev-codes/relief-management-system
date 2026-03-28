import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Grid, Box, InputLabel } from '@mui/material';
import LoanValidator from '@/helper/LoanValidator';
import { Snackbar, Alert } from '@mui/material';
import LoanCalculator from '@/helper/LoanCalculator';
import NepaliDatePickerInput from '@/Components/Mui/NepaliDatePickerInput';
import FetchConvertedDate from '@/helper/FetchConvertedDate';


const PaymentDetailModal = ({
    formState,
    open,
    onClose,
    onSave,
    detail,
    installmentPeriods,
    paymentModes,
    fiscalYears,
    editingPaymentDetail,
    setPaymentDetails,
    handleSubmit,
    loanPayment

}) => {
    const [localFormState, setLocalFormState] = useState(formState);
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // console.log(detail)



    useEffect(() => {
        if (detail) {
            setLocalFormState(detail);
        } else {
            setLocalFormState(formState);
        }
    }, [detail, formState]);

    const validateForm = () => {
        const requiredFields = [
            'fiscal_year_id', 'loan_distribution_date_bs', 'payment_source_id',
            'receipt_no', 'installment_id', 'installment_amount',
        ];
        const newErrors = {};
        requiredFields.forEach(field => {
            if (!localFormState[field]) newErrors[field] = 'Required';
        });
        return newErrors;
    };



    const handleLocalChange = (e) => {
        const { name, value } = e.target;
        setLocalFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleLocalDateChange = async (name, value) => {
        if (name === 'loan_distribution_date_bs') {
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

    // const handleLocalDateChange = (name, value) => {
    //     setLocalFormState(prev => ({ ...prev, [name]: value }));
    // };

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

        setPaymentDetails(prevDetails => {
            if (editingPaymentDetail) {
                return prevDetails.map(d => d.id === editingPaymentDetail.id ? dataToSave : d);
            } else {
                return [...prevDetails, { ...dataToSave, id: Date.now() }]; // Temporary ID for new items
            }
        });

        onClose();


    };



    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" PaperProps={{ style: { width: '600px' } }}>
            <DialogTitle>{detail ? 'Edit Payment Detail' : 'Add Payment Detail'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Fiscal Year ID */}
                    <Grid item xs={12} sm={6}> {/* Takes full width on small screens, half on larger screens */}
                        <TextField
                            select
                            size="small"
                            fullWidth
                            margin="normal"
                            name="fiscal_year_id"
                            label="आर्थिक वर्ष "
                            value={localFormState.fiscal_year_id}
                            onChange={handleLocalChange}
                        >
                            {fiscalYears.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.code}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Loan Distribution Date */}
                    <Grid item xs={12} sm={6} mt={2}>
                        <NepaliDatePickerInput
                            formName="ऋण उपलब्ध मिति"
                            value={localFormState.loan_distribution_date_bs}
                            handleDateChange={(date) => handleLocalDateChange('loan_distribution_date_bs', date)}
                            error={errors.loan_distribution_date_bs}
                            InputLabelProps={{
                                sx: {
                                    '& .MuiFormLabel-asterisk': { color: 'red' },
                                },
                            }}
                        />
                    </Grid>

                    {/* Payment Source ID */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            size="small"
                            fullWidth
                            required
                            margin="normal"
                            name="payment_source_id"
                            label="भुक्तानी माध्यम"
                            value={localFormState.payment_source_id}
                            onChange={handleLocalChange}
                            InputLabelProps={{
                                sx: {
                                    '& .MuiFormLabel-asterisk': { color: 'red' },
                                },
                            }}
                        >
                            {paymentModes.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}--{option.name_np}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Receipt No */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            size="small"
                            fullWidth
                            margin="normal"
                            name="receipt_no"
                            label="चेक /भौचर नं "
                            value={localFormState.receipt_no}
                            onChange={handleLocalChange}
                            required
                            InputLabelProps={{
                                sx: {
                                    '& .MuiFormLabel-asterisk': { color: 'red' },
                                },
                            }}
                        />
                    </Grid>

                    {/* Installment ID */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            size="small"
                            fullWidth
                            margin="normal"
                            name="installment_id"
                            label="किस्ता"
                            value={localFormState.installment_id}
                            onChange={handleLocalChange}
                            required
                            InputLabelProps={{
                                sx: {
                                    '& .MuiFormLabel-asterisk': { color: 'red' },
                                },
                            }}
                        >
                            {installmentPeriods.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}--{option.name_np}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>



                    {/* Installment Amount */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            name="installment_amount"
                            label="किस्ता विवरण रकम"
                            value={localFormState.installment_amount}
                            onChange={handleLocalChange}
                            required
                            InputLabelProps={{
                                sx: {
                                    '& .MuiFormLabel-asterisk': { color: 'red' },
                                },
                            }}
                        />
                    </Grid>

                    {/* Loan Description */}
                    <Grid item xs={12}>
                        <TextField
                            size="small"
                            required
                            fullWidth
                            multiline
                            rows={4}
                            label="विवरण"
                            name="loan_description"
                            value={localFormState.loan_description}
                            onChange={handleLocalChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmitLocal} color="primary">
                    {detail ? 'Update' : 'Add'}
                </Button>
            </DialogActions>

            {/* Snackbar for alerts */}
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

export default PaymentDetailModal;
