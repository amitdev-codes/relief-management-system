// components/LoanDetailsSection.js
import { useState, useEffect } from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';
import FetchConvertedDate from '@/helper/FetchConvertedDate';
import NepaliDatePickerWithDefault from '@/Components/Mui/NepaliDatePickerWithDefault';

const InterestDetailsSection = ({
    formState,
    handleChange,
    handleDateChange,
    errors
}) => {
    useEffect(() => {
        const fetchInterestRate = async () => {
            try {
                const response = await axios.get(`/api/educational-faculties/interest_rate/${formState.loan_purpose_type_id}`);
                console.log(response.data.interest_rate)
                const interest_rate = response.data.interest_rate;
                const loan_repayment_period = response.data.loan_repayment_period;
                handleChange({ target: { name: 'interest_rate', value: interest_rate } });
                handleChange({ target: { name: 'loan_repayment_period', value: loan_repayment_period } });
            } catch (error) {
                console.error('Error fetching educational faculties:', error);
            }
        };
        if (formState.loan_purpose_type_id) {
            fetchInterestRate();
        }
    }, [formState.loan_purpose_type_id]);



    return (
        <>
            <Grid item xs={12} sm={3} mt={2}>
                <TextField
                    fullWidth
                    required
                    size="small"
                    name="remaining_amount"
                    label="बाकि रकम"
                    value={formState.remaining_amount}
                    onChange={handleChange}
                    error={!!errors.remaining_amount}
                    helperText={errors.remaining_amount}
                />
            </Grid>
            {/*
            <Grid item xs={12} sm={3} mt={2}>
                <NepaliDatePickerWithDefault
                    formName="ऋण फिर्ता मिति"
                    value={formState.loan_started_date_bs || null}
                    handleDateChange={(date) => handleDateChange('loan_started_date_bs', date)}
                    error={errors.loan_started_date_bs}
                />
            </Grid> */}

            <Grid item xs={12} sm={3} mt={2}>
                <TextField
                    size="small"
                    required
                    fullWidth
                    name="loan_repayment_period"
                    label="ऋण फिर्ता अवधि "
                    value={formState.loan_repayment_period}
                    onChange={handleChange}
                    error={!!errors.loan_repayment_period}
                    helperText={errors.loan_repayment_period}
                >
                </TextField>
            </Grid>

            <Grid item xs={12} sm={3} mt={2}>
                <TextField
                    size="small"
                    required
                    fullWidth
                    label="ब्याजदर"
                    name="interest_rate"
                    value={formState.interest_rate}
                    onChange={handleChange}
                    error={!!errors.interest_rate}
                    helperText={errors.interest_rate}
                >
                </TextField>
            </Grid>
        </>
    );
};

export default InterestDetailsSection;
