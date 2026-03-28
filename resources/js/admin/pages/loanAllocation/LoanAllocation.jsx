import { Box, Card, CardContent, Grid, Button } from '@mui/material';
import { usePage } from '@inertiajs/react';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ApplicantSection from '@/admin/Components/loan/loanAllocation/ApplicantSection';
import LoanDetailsSection from '@/admin/Components/loan/loanAllocation/LoanDetailsSection';
import InterestDetailsSection from '@/admin/Components/loan/loanAllocation/InterestDetailsSection';
import FileUploadSection from '@/admin/Components/loan/loanAllocation/FileUploadSection';
import RemarksSection from '@/admin/Components/loan/loanAllocation/RemarksSection';
import useFormLogic from '@/hooks/loan/loanAllocation/loanAllocationForm/useFormLogic';
import useInertiaForm from '@/hooks/loan/loanAllocation/loanAllocationForm/useInertiaForm';
import StatusSwitchComponent from '@/Components/Mui/StatusSwitchComponent';
import PaymentReimbursementSection from '@/admin/Components/loan/loanAllocation/PaymentReimbursementSection';

const LoanAllocation = ({
    users,
    existingUser,
    current_fiscal_year_id,
    educational_loan_faculties,
    loan_purpose_types,
    fiscalYears,
    loanAllocation,
    existingFiles
}) => {


    const { formState, handleChange, handleStatusChange, handleDateChange, handleFileChange, handleRemoveFile } = useFormLogic(loanAllocation, existingFiles, current_fiscal_year_id);
    const { handleSubmit, errors, processing } = useInertiaForm(formState, loanAllocation);

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ fontFamily: "Kalimati" }}>
            <Card sx={{ mb: 3, overflow: 'visible', mt: 3 }}>
                <CardContent>
                    <Grid container spacing={3}>
                        <ApplicantSection
                            formState={formState}
                            handleChange={handleChange}
                            users={users}
                            existingUser={existingUser}
                            loanAllocation={loanAllocation}
                            errors={errors}
                        />
                        <LoanDetailsSection
                            formState={formState}
                            handleChange={handleChange}
                            handleDateChange={handleDateChange}
                            loan_purpose_types={loan_purpose_types}
                            fiscalYears={fiscalYears}
                            current_fiscal_year_id={current_fiscal_year_id}
                            educational_loan_faculties={educational_loan_faculties}
                            loanAllocation={loanAllocation}
                            errors={errors}
                        />

                        <Grid item xs={12} sm={12} mt={2}>
                            <StatusSwitchComponent checked={formState.status} handleStatusChange={handleStatusChange} name="ऋणीको स्थिति" />
                        </Grid>

                        <FileUploadSection
                            files={formState.files}
                            handleFileChange={handleFileChange}
                            handleRemoveFile={handleRemoveFile}
                            errors={errors}
                        />
                        {formState.status && (
                            <InterestDetailsSection
                                formState={formState}
                                handleChange={handleChange}
                                handleDateChange={handleDateChange}
                                errors={errors}
                            />
                        )}
                        <RemarksSection
                            remarks={formState.remarks}
                            handleChange={handleChange}
                            errors={errors}
                        />
                    </Grid>
                </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={processing}
                >
                    {processing ? (loanAllocation.id ? 'Updating...' : 'Saving...') : (loanAllocation.id ? 'Update' : 'Create')}
                </Button>
            </Box>
        </Box>
    );
};

export default LoanAllocation;
