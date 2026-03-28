// components/LoanDetailsSection.js
import { useState, useEffect } from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';
import NepaliDatePickerInput from '@/Components/Mui/NepaliDatePickerInput';
import { NepaliDateConverter } from 'react-nepali-date-picker-lite';
import FetchConvertedDate from '@/helper/FetchConvertedDate';


const LoanClearanceSection = ({
    formState,
    users,
    existingUser,
    handleChange,
    handleDateChange,
    loan_purpose_types,
    educational_loan_faculties,
    fiscalYears,
    current_fiscal_year_id,
    loanAllocation,
    errors
}) => {

    const [userNames, setUserNames] = useState('');



    useEffect(() => {
        if (formState.user_id) {
            const names = users.filter(user => user.id === formState.user_id)
                .map(user => {
                    return [user.first_name, user.middle_name, user.last_name].filter(Boolean).join(' ');
                }).join(', ');
            setUserNames(names);
        }
    }, [formState.user_id, users]);




    // Calculate default dates
    useEffect(() => {
        //bs
        const defaultLoanProvidedDate = FetchConvertedDate.getDateFromToday(7);
        handleDateChange('loan_provided_date_bs', defaultLoanProvidedDate);
        //ad
        const convertedDate = FetchConvertedDate.getConvertedDateBS2AD(defaultLoanProvidedDate);
        handleDateChange('loan_provided_date', convertedDate);
        //bs
        const defaultLoanAskedDate = NepaliDateConverter.getNepaliDate();
        handleDateChange('loan_asked_date_bs', defaultLoanAskedDate);
        //ad
        const loanAskedDate = FetchConvertedDate.getConvertedDateBS2AD(defaultLoanAskedDate);
        handleDateChange('loan_asked_date', loanAskedDate);
    }, []);



    // console.log(formState)

    return (
        <>
            <Grid item xs={12} sm={3} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    required
                    label="आवेदक  आईडी "
                    name="user_id"
                    size="small"
                    value={formState.user_id}
                    onChange={handleChange}
                    error={!!errors.user_id}
                    helperText={errors.user_id}
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{
                        sx: {
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                        },
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={3} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    size="small"
                    label="पुरा नाम"
                    value={userNames}
                    onChange={(e) => setUserNames(e.target.value)}
                    InputProps={{ readOnly: true }}
                />
            </Grid>
            <Grid item xs={12} sm={3} mt={2}>
                <TextField
                    select
                    fullWidth
                    size="small"
                    required
                    name="fiscal_year_id"
                    label="आर्थिक वर्ष "
                    value={formState.fiscal_year_id}
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

            <Grid item xs={12} sm={3} mt={2}>
                <NepaliDatePickerInput
                    formName="ऋण माग मिति"
                    value={formState.loan_asked_date_bs}
                    handleDateChange={(date) => handleDateChange('loan_asked_date_bs', date)}
                    error={errors.loan_asked_date_bs}
                    required
                />
            </Grid>



            <Grid item xs={12} sm={3} mt={2}>
                <TextField
                    select
                    fullWidth
                    size="small"
                    required
                    name="loan_purpose_type_id"
                    label="ऋणको उद्देश्य"
                    value={formState.loan_purpose_type_id}
                    onChange={handleChange}
                    error={!!errors.loan_purpose_type_id}
                    helperText={errors.loan_purpose_type_id}
                    InputLabelProps={{
                        sx: {
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                        },
                    }}

                >
                    {loan_purpose_types.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}--{option.name_np}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>


            <Grid item xs={12} sm={3} mt={2}>
                <TextField
                    fullWidth
                    required
                    size="small"
                    name="loan_approved_amount"
                    label="ऋण स्वीकृत रकम"
                    value={formState.loan_approved_amount}
                    onChange={handleChange}
                    error={!!errors.loan_approved_amount}
                    helperText={errors.loan_approved_amount}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>
        </>
    );
};

export default LoanClearanceSection;
