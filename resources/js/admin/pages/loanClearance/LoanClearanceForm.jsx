import { Box, Card, CardContent, Grid, Button } from '@mui/material';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import useFormLogic from '@/hooks/loan/loanClearance/useFormLogic';
import useInertiaForm from '@/hooks/loan/loanClearance/useInertiaForm';
import LoanClearanceSection from '@/admin/Components/loan/loanClearance/LoanClearanceSection';
import PaymentDetailsSection from '@/admin/Components/loan/loanClearance/PaymentDetailsSection';
import FileUploadSection from '@/admin/Components/loan/loanClearance/FileUploadSection';
import RemarksSection from '@/admin/Components/loan/loanClearance/RemarksSection';
import { useState, useEffect } from "react";
import { NepaliDateConverter } from 'react-nepali-date-picker-lite';
import FetchConvertedDate from '@/helper/FetchConvertedDate';
import toastr from 'toastr';

const LoanClearanceForm = () => {
    const {
        educational_loan_faculties,
        previousPayments = [],
        users,
        existingUser,
        loan_purpose_types = [],
        installmentPeriods = [],
        paymentModes = [],
        loanClearance = {},
        fiscalYears = [],
        existingFiles,
        current_fiscal_year_id,
        paymentDetails = []
    } = usePage().props;

    const { formState, handleChange, handleDateChange, handleFileChange, handleRemoveFile, onPaymentDetailsChange } = useFormLogic(loanClearance, existingFiles, current_fiscal_year_id);
    const { handleSubmit, errors, processing } = useInertiaForm(formState, loanClearance);

    return (
        <AuthenticatedLayout>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ fontFamily: "Kalimati" }}>
                <Button variant="contained" color="success" sx={{ ml: 2 }} endIcon={<ContactMailIcon />}>
                    {'Make Loan Payment'}
                </Button>

                <Card sx={{ mb: 3, overflow: 'visible', mt: 3 }}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <LoanClearanceSection
                                formState={formState}
                                users={users}
                                existingUser={existingUser}
                                loanClearance={loanClearance}
                                handleChange={handleChange}
                                handleDateChange={handleDateChange}
                                educational_loan_faculties={educational_loan_faculties}
                                loan_purpose_types={loan_purpose_types}
                                fiscalYears={fiscalYears}
                                errors={errors}
                            />
                            <PaymentDetailsSection
                                formState={formState}
                                existingUser={existingUser}
                                loanClearance={loanClearance}
                                handleChange={handleChange}
                                handleDateChange={handleDateChange}
                                previousPayments={previousPayments}
                                installmentPeriods={installmentPeriods}
                                paymentModes={paymentModes}
                                fiscalYears={fiscalYears}
                                current_fiscal_year_id={current_fiscal_year_id}
                                errors={errors}
                                onPaymentDetailsChange={onPaymentDetailsChange}
                            />

                            <FileUploadSection
                                files={formState.files}
                                handleFileChange={handleFileChange}
                                handleRemoveFile={handleRemoveFile}
                                errors={errors}
                                fileName={"आवस्यक कागजातहरु "}
                            />
                            <RemarksSection
                                formState={formState}
                                handleChange={handleChange}
                                errors={errors}
                            />
                        </Grid>
                    </CardContent>
                </Card>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    // disabled={processing}
                    >
                        {(loanClearance.id ? 'Update' : 'Create')}
                        {/* {processing ? (loanClearance.id ? 'Updating...' : 'Saving...') : (loanClearance.id ? 'Update' : 'Create')} */}
                    </Button>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
};

export default LoanClearanceForm;
