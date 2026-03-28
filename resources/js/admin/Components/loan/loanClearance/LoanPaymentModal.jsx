import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Grid } from '@mui/material';
import LoanValidator from '@/helper/LoanValidator';
import { Snackbar, Alert } from '@mui/material';
import NepaliDatePickerInput from '@/Components/Mui/NepaliDatePickerInput';
import { NepaliDateConverter } from 'react-nepali-date-picker-lite';
import FetchConvertedDate from '@/helper/FetchConvertedDate';


const defaultFormData = {
    fiscal_year_id: '',
    installment_actual_date: '',
    installment_actual_date_bs: '',
    installment_cleared_date: '',
    installment_cleared_date_bs: '',
    payment_source_id: '', // Default value
    receipt_no: '',
    installment_id: '',
    previous_year_remaining_interest: '',
    current_year_interest: '',
    total_interest_to_pay: '',
    total_paid_interest: '',
    remaining_current_interest: '',
    installment_amount: '',
    fine_amount: '',
    previous_year_remaining_amount: '',
    current_year_total_amount: '',
    total_amount_to_pay: '',
    total_paid_amount: '',
    total_remaining_amount: '',
    loan_description: '',
};

const LoanPaymentModal = ({
    formState,
    open,
    onClose,
    onSave,
    detail,
    installmentPeriods,
    paymentModes,
    userId,
    fiscalYears,
    current_fiscal_year_id,
    allocatedAmount,
    existingInstallments,
}) => {
    const [formData, setFormData] = useState(defaultFormData);
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    console.log(formData)

    const updateFormData = useCallback((updates) => {
        setFormData(prevData => ({ ...prevData, ...updates }));
    }, []);

    useEffect(() => {
        if (detail) {
            setFormData(detail);
        } else {
            setFormData({
                ...defaultFormData,
                fiscal_year_id: current_fiscal_year_id || ''
            });
        }
    }, [detail, current_fiscal_year_id]);


    const handleFetchError = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };
    const fetchInstallmentAmount = useCallback(async (userId, installmentId) => {
        const apiUrl = `/admin/fetchInstallmentAmount/${userId}/${installmentId}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}\n${text}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json();
        } else {
            const text = await response.text();
            throw new Error(`Expected JSON response but received: ${text}`);
        }
    }, []);
    const calculateFine = useCallback(async (userId, installmentId, clearedDate) => {
        const apiUrl = `/admin/calculateFine/${userId}/${installmentId}/${clearedDate}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}\n${text}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json();
        } else {
            const text = await response.text();
            throw new Error(`Expected JSON response but received: ${text}`);
        }
    }, []);


    const updateInstallmentData = useCallback(async () => {
        if (formData.installment_id && formData.installment_cleared_date) {
            try {
                const [installmentData, fineData] = await Promise.all([
                    fetchInstallmentAmount(userId, formData.installment_id),
                    calculateFine(userId, formData.installment_id, formData.installment_cleared_date)
                ]);


                updateFormData({
                    installment_amount: installmentData.installment_amount,
                    previous_year_remaining_interest: installmentData.previous_year_remaining_interest,
                    current_year_interest: installmentData.current_year_interest,
                    total_interest_to_pay: installmentData.total_interest_to_pay,
                    total_paid_interest: installmentData.total_interest_to_pay,
                    remaining_current_interest: installmentData.remaining_current_interest,
                    fine_amount: installmentData.fine_amount,
                    previous_year_remaining_amount: installmentData.previous_year_remaining_amount,
                    current_year_total_amount: installmentData.current_year_total_amount,
                    total_amount_to_pay: installmentData.total_amount_to_pay,
                    total_paid_amount: installmentData.total_paid_amount,
                    total_remaining_amount: installmentData.total_remaining_amount,
                    // Use the total amount from fine calculation
                    // installment_actual_date_bs: installmentData.due_date_bs,
                    // installment_actual_date: FetchConvertedDate.getConvertedDateBS2AD(installmentData.due_date_bs)

                    installment_actual_date_bs: installmentData.installment_actual_date_bs,
                    installment_actual_date: installmentData.installment_actual_date,
                });
            } catch (error) {
                console.error('Error updating installment data:', error);
                setSnackbarMessage(`Error updating installment data: ${error.message}`);
                setSnackbarOpen(true);
            }
        }
    }, [formData.installment_id, formData.installment_cleared_date, userId, fetchInstallmentAmount]);


    useEffect(() => {
        updateInstallmentData();
    }, [updateInstallmentData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });

        if (name === 'installment_id') {
            updateInstallmentData();
        }
    };

    useEffect(() => {
        if (formData.installment_id) {
            fetchInstallmentAmount(userId, formData.installment_id)
                .then(data => {
                    setFormData(prevData => ({
                        ...prevData,
                        installment_amount: data.installment_amount,

                        previous_year_remaining_interest: data.previous_year_remaining_interest,
                        current_year_interest: data.current_year_interest,
                        total_interest_to_pay: data.total_interest_to_pay,
                        total_paid_interest: data.total_interest_to_pay,
                        remaining_current_interest: data.remaining_current_interest,

                        fine_amount: data.fine_amount,
                        previous_year_remaining_amount: data.previous_year_remaining_amount,
                        current_year_total_amount: data.current_year_total_amount,
                        total_amount_to_pay: data.total_amount_to_pay,
                        total_paid_amount: data.total_amount_to_pay,
                        total_remaining_amount: data.total_remaining_amount,

                        installment_actual_date_bs: data.installment_actual_date_bs,
                        installment_actual_date: data.installment_actual_date,

                        // installment_actual_date_bs: data.due_date_bs,
                        // installment_actual_date: FetchConvertedDate.getConvertedDateBS2AD(data.due_date_bs),
                    }));
                })
                .catch(error => {
                    console.error('Error fetching installment amount:', error);
                    setSnackbarMessage('Error fetching installment amount');
                    setSnackbarOpen(true);
                });
        }
    }, [formData.installment_id, userId]);

    useEffect(() => {
        const totalAmount = parseFloat(formData.total_amount_to_pay) || 0;
        const totalPaidAmount = parseFloat(formData.total_paid_amount) || totalAmount; // Default to total_amount if not set
        const newRemainingAmount = totalAmount - totalPaidAmount;

        setFormData(prevData => ({
            ...prevData,
            total_remaining_amount: newRemainingAmount.toFixed(2)
        }));

    }, [formData.total_amount_to_pay, formData.total_paid_amount]);


    const validateForm = () => {
        const newErrors = {};
        if (!formData.payment_source_id) newErrors.payment_source_id = 'Required';
        if (!formData.receipt_no) newErrors.receipt_no = 'Required';
        if (!formData.installment_id) newErrors.installment_id = 'Required';
        if (!formData.installment_amount) newErrors.installment_amount = 'Required';
        return newErrors;
    };


    const handleSubmit = () => {
        const total_amount = parseFloat(formData.total_paid_amount);
        console.log(allocatedAmount, total_amount, existingInstallments)
        LoanValidator.validateInstallment(allocatedAmount, total_amount, existingInstallments);

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSnackbarMessage('Please fill in all required fields.');
            setSnackbarOpen(true);
            return;
        }

        setErrors({});
        console.log(formData);
        onSave(formData);
    };
    // Convert BS to AD on selecting the installment actual date
    const handleInstallmentActualDateChange = (date) => {
        const convertedDate = FetchConvertedDate.getConvertedDateBS2AD(date);
        setFormData(prev => ({
            ...prev,
            installment_actual_date_bs: date,
            installment_actual_date: convertedDate
        }));
    };

    useEffect(() => {
        const installment_cleared_date_bs = NepaliDateConverter.getNepaliDate();
        const installment_cleared_date = FetchConvertedDate.getConvertedDateBS2AD(installment_cleared_date_bs);
        updateFormData({
            installment_cleared_date_bs: installment_cleared_date_bs,
            installment_cleared_date: installment_cleared_date
        });

    }, []);

    const handleInstallmentClearedDateChange = (date) => {
        const convertedDate = FetchConvertedDate.getConvertedDateBS2AD(date);
        updateFormData({
            installment_cleared_date_bs: date,
            installment_cleared_date: convertedDate
        });
        updateInstallmentData();
    };

    const handlePaidInterestChange = (e) => {
        const totalPaidInterest = parseFloat(e.target.value) || 0;
        const totalInterestToPay = parseFloat(formData.total_interest_to_pay) || 0;
        const remainingInterest = totalInterestToPay - totalPaidInterest;
        const totalAmountToPay = parseFloat(formData.total_amount_to_pay) || 0;
        const totalPaidAmount = totalAmountToPay - remainingInterest;

        updateFormData({
            total_paid_interest: totalPaidInterest,
            remaining_current_interest: remainingInterest.toFixed(2),
            total_paid_amount: totalPaidAmount,
        });
    };

    const handlePaidAmountChange = (e) => {
        const totalPaidAmount = parseFloat(e.target.value) || 0;
        const totalAmountToPay = parseFloat(formData.total_amount_to_pay) || 0;
        const remainingAmount = totalAmountToPay - totalPaidAmount;

        updateFormData({
            total_paid_amount: totalPaidAmount,
            total_remaining_amount: remainingAmount.toFixed(2),
        });

        // Optionally trigger an additional callback if needed
        onRemainingAmountChange(totalPaidAmount, remainingAmount);
    };



    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl" PaperProps={{ style: { width: '80%', maxWidth: 'none' } }}>
            <DialogTitle>{detail ? 'Edit Payment Detail' : 'Add Payment Detail'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Installment ID */}
                    <Grid item xs={12} sm={4} mt={3}>
                        <TextField
                            select
                            size="small"
                            fullWidth
                            margin="normal"
                            name="installment_id"
                            label="किस्ता"
                            value={formData.installment_id}
                            required
                            onChange={handleChange}
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

                    {/* Fiscal year id ID */}
                    <Grid item xs={12} sm={4} mt={5}>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            required
                            name="fiscal_year_id"
                            label="आर्थिक वर्ष "
                            value={current_fiscal_year_id || formData.fiscal_year_id}
                            onChange={handleChange}
                            error={!!errors.fiscal_year_id}
                            helperText={errors.fiscal_year_id}
                        >
                            {fiscalYears.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.code}
                                </MenuItem>
                            ))}

                        </TextField>
                    </Grid>


                    <Grid item xs={12} sm={4} mt={3}>
                        <TextField
                            size="small"
                            fullWidth
                            margin="normal"
                            name="installment_actual_date_bs"
                            label="किस्ता रकम भुझाउने मिति"
                            value={formData.installment_actual_date_bs}
                            onChange={(e) => handleInstallmentActualDateChange(e.target.value)}


                        />
                    </Grid>

                    {/* installment_cleared_date */}
                    <Grid item xs={12} sm={4} mt={2}>
                        <NepaliDatePickerInput
                            formName="किस्ता रकम भुजाएको मिति "
                            value={formData.installment_cleared_date_bs}
                            required
                            handleDateChange={(date) => handleInstallmentClearedDateChange(date)}
                            // handleDateChange={(date) => setFormData(prev => ({ ...prev, installment_cleared_date_bs: date }))}
                            error={errors.installment_actual_date_bs}
                            InputLabelProps={{
                                sx: {
                                    '& .MuiFormLabel-asterisk': { color: 'red' },
                                },
                            }}
                        />
                    </Grid>




                    {/* Installment Amount */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            name="installment_amount"
                            label="किस्ता विवरण रकम"
                            value={formData.installment_amount}
                            onChange={handleChange}
                        />
                    </Grid>
                    {/* previous year Interest */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="गत वर्षको ब्याज"
                            value={formData.previous_year_remaining_interest}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    {/* Current year Interest */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="चालु वर्षको ब्याज"
                            value={formData.current_year_interest}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    {/* Total  Interest */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="कुल  ब्याज"
                            value={formData.total_interest_to_pay}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    {/* Paid  Interest */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="कुल तिरेको ब्याज"
                            name="total_paid_interest"
                            value={formData.total_paid_interest}
                            onChange={handlePaidInterestChange}

                        />
                    </Grid>

                    {/* remaining  Interest */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="बाकी  ब्याज"
                            name="remaining_current_interest"
                            value={formData.remaining_current_interest}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>


                    {/* Total Fine */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            size="small"
                            fullWidth
                            margin="normal"
                            name="fine_amount"
                            label="हर्जाना रकम "
                            value={formData.fine_amount}
                            onChange={handleChange}
                        />
                    </Grid>



                    {/* Previous year Amount */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="गत वर्षको ऋण रकम"
                            name="previous_year_remaining_amount"
                            value={formData.previous_year_remaining_amount}
                            onChange={handleChange}

                        />
                    </Grid>

                    {/* Previous year Amount */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="चालु  वर्षको ऋण रकम"
                            name="current_year_total_amount"
                            value={formData.current_year_total_amount}
                            onChange={handleChange}

                        />
                    </Grid>

                    {/* total amount to pay year Amount */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="कुल तिर्न बाकी  ऋण रकम"
                            name="total_amount_to_pay"
                            value={formData.total_amount_to_pay}
                            onChange={handleChange}

                        />
                    </Grid>

                    {/* total paid Amount */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="कुल तिरेको ऋण रकम"
                            name="total_paid_amount"
                            value={formData.total_paid_amount}
                            onChange={handlePaidAmountChange}

                        />
                    </Grid>

                    {/* Total Remaining Amount */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="बाकी रकम"
                            name="total_remaining_amount"
                            value={formData.total_remaining_amount}
                            onChange={handleChange}
                            disabled

                        />
                    </Grid>

                    {/* Payment Source ID */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            select
                            size="small"
                            fullWidth
                            margin="normal"
                            name="payment_source_id"
                            label="भुक्तानी माध्यम"
                            value={formData.payment_source_id}
                            onChange={handleChange}
                            required
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
                    <Grid item xs={12} sm={4}>
                        <TextField
                            size="small"
                            fullWidth
                            margin="normal"
                            name="receipt_no"
                            label="चेक /भौचर नं "
                            value={formData.receipt_no}
                            onChange={handleChange}
                            required
                            InputLabelProps={{
                                sx: {
                                    '& .MuiFormLabel-asterisk': { color: 'red' },
                                },
                            }}
                        />
                    </Grid>


                    {/* Loan Description */}
                    <Grid item xs={12} sm={12}>
                        <TextField
                            size="small"
                            required
                            fullWidth
                            multiline
                            rows={4}
                            label="विवरण"
                            name="loan_description" // Ensure the name is set
                            value={formData.loan_description} // Use the state variable
                            onChange={handleChange} // Call handleChange
                        />
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary">
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

export default LoanPaymentModal;
