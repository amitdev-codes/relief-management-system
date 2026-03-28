// components/LoanDetailsSection.js
import { useState, useEffect } from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';
import NepaliDatePickerInput from '@/Components/Mui/NepaliDatePickerInput';
import { NepaliDateConverter } from 'react-nepali-date-picker-lite';
import FetchConvertedDate from '@/helper/FetchConvertedDate';


const LoanDetailsSection = ({
    formState,
    handleChange,
    handleDateChange,
    loan_purpose_types,
    educational_loan_faculties,
    fiscalYears,
    current_fiscal_year_id,
    loanAllocation,
    errors
}) => {
    const [loan_educational_faculty_type_id, setLoanEducationalFacultyTypeId] = useState(formState.loan_educational_faculty_type_id);
    const [defaultLoanProvidedDate, setDefaultLoanProvidedDate] = useState(null);
    const [defaultLoanAskedDate, setDefaultLoanAskedDate] = useState(null);
    const [fiscal_year_id, setFiscalYearId] = useState(current_fiscal_year_id);


    // console.log(formState)


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

    useEffect(() => {
        const fetchEducationalFaculties = async () => {
            try {
                const response = await axios.get(`/api/educational-faculties/${loan_educational_faculty_type_id}`);
                const loanAmount = response.data.loan_amount;
                handleChange({ target: { name: 'loan_allocated_amount', value: loanAmount } });
                if (!loanAllocation.id) {
                    handleChange({ target: { name: 'loan_asked_amount', value: loanAmount } });
                    handleChange({ target: { name: 'loan_approved_amount', value: loanAmount } });
                }

            } catch (error) {
                console.error('Error fetching educational faculties:', error);
            }
        };

        if (loan_educational_faculty_type_id) {
            fetchEducationalFaculties();
        }
    }, [loan_educational_faculty_type_id, loanAllocation]);



    const handleFacultyChange = (e) => {
        const { value } = e.target;
        setLoanEducationalFacultyTypeId(value); // Update the local state to trigger useEffect
        handleChange(e); // Also update the form state using the passed handler
    };

    const handleFiscalYearChange = (e) => {
        const { value } = e.target;
        setFiscalYearId(value);
        handleChange(e);

    }

    return (
        <>
            <Grid item xs={12} sm={3} mt={2}>
                <TextField
                    select
                    fullWidth
                    size="small"
                    required
                    name="fiscal_year_id"
                    label="आर्थिक वर्ष "
                    value={fiscal_year_id}
                    onChange={handleFiscalYearChange}
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



            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
                <TextField
                    select
                    fullWidth
                    size="small"
                    required
                    name="loan_educational_faculty_type_id"
                    label="शैक्षिक संकाय"
                    value={formState.loan_educational_faculty_type_id}
                    onChange={handleFacultyChange}
                    error={!!errors.loan_educational_faculty_type_id}
                    helperText={errors.loan_educational_faculty_type_id}
                    InputLabelProps={{
                        sx: {
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                        },
                    }}
                >
                    {educational_loan_faculties.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.faculty}
                        </MenuItem>
                    ))}

                </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                    fullWidth
                    required
                    size="small"
                    name="institute_name"
                    label="शैक्षिक संस्थाको नाम "
                    value={formState.institute_name}
                    onChange={handleChange}
                    error={!!errors.institute_name}
                    helperText={errors.institute_name}
                    InputLabelProps={{
                        sx: {
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                        },
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                    fullWidth
                    required
                    size="small"
                    name="loan_allocated_amount"
                    label="ऋण तोकिएको रकम"
                    value={formState.loan_allocated_amount}
                    onChange={handleChange}
                    error={!!errors.loan_allocated_amount}
                    helperText={errors.loan_allocated_amount}
                    InputLabelProps={{
                        sx: {
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                        },
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                    fullWidth
                    required
                    size="small"
                    name="loan_asked_amount"
                    label="ऋण माग रकम"
                    value={formState.loan_asked_amount}
                    onChange={handleChange}
                    error={!!errors.loan_asked_amount}
                    helperText={errors.loan_asked_amount}
                    InputLabelProps={{
                        sx: {
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                        },
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
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

                    InputLabelProps={{
                        sx: {
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                        },
                    }}
                />
            </Grid>
        </>
    );
};

export default LoanDetailsSection;
