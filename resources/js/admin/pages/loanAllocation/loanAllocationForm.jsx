import { Box, Card, CardContent, Grid, Button, Tabs, Tab, Chip, Snackbar } from '@mui/material';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import LoanAllocation from './LoanAllocation';
import PaymentAllocationForm from './PaymentAllocationForm';
import { useState, useEffect } from 'react';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PaymentIcon from '@mui/icons-material/Payment'; // Add an appropriate icon for the second tab
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PaymentReimbursementForm from './PaymentReimbursementForm';


const LoanAllocationForm = () => {
    const { educational_loan_faculties, previousPayments, previousReimbursements, users, existingUser, loan_purpose_types, current_fiscal_year_id,
        installmentPeriods, paymentModes, fiscalYears, loanAllocation = {}, existingFiles, reimbursementPayment = {} } = usePage().props;

    const [selectedTab, setSelectedTab] = useState(0); // State to manage the selected tab
    const [isLoanApproved, setIsLoanApproved] = useState(false);
    const [isLoanFullyPaid, setIsLoanFullyPaid] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');




    useEffect(() => {
        // Check if loan is approved and has an amount
        setIsLoanApproved(loanAllocation.status == true && loanAllocation.loan_approved_amount);

        // Check if loan is fully paid
        setIsLoanFullyPaid(loanAllocation.remaining_amount == 0 && previousPayments.some(payment => payment.loan_allocation_id === loanAllocation.id));
    }, [loanAllocation, previousPayments]);



    const handleTabChange = (event, newValue) => {
        if (newValue === 1 && !isLoanApproved) {
            setSnackbarMessage("Loan is not approved or amount is not set.");
            setSnackbarOpen(true);
            return;
        }
        if (newValue === 2 && !isLoanFullyPaid) {
            setSnackbarMessage("Loan payments have not been made or the loan is not fully paid.");
            setSnackbarOpen(true);
            return;
        }
        setSelectedTab(newValue);
    };
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };
    const getChipColor = (tabIndex) => {
        if (tabIndex === 0) return 'primary';
        if (tabIndex === 1) return isLoanApproved ? 'success' : 'error';
        if (tabIndex === 2) return isLoanFullyPaid ? 'success' : 'error';
    };

    const getChipLabel = (tabIndex) => {
        if (tabIndex === 0) return 'Available';
        if (tabIndex === 1) return isLoanApproved ? 'Approved' : 'Not Approved';
        if (tabIndex === 2) return isLoanFullyPaid ? 'Fully Paid' : 'Not Paid';
    };


    return (
        <AuthenticatedLayout>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    centered
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="loan allocation tabs"
                >
                    {['ऋणीको आवेदन फर्म भर्नुहोस्', 'स्वीकृत ऋणीको भुक्तानी', 'ऋण फिर्ता किस्ता मिति'].map((label, index) => (
                        <Tab
                            key={index}
                            label={
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <Button
                                        variant="outlined"
                                        color={selectedTab === index ? "secondary" : "success"}
                                        size='large'
                                        endIcon={index === 0 ? <ContactMailIcon /> : index === 1 ? <PaymentIcon /> : <CalendarMonthOutlinedIcon />}
                                        disabled={(index === 1 && !isLoanApproved) || (index === 2 && !isLoanFullyPaid)}
                                    >
                                        {label}
                                    </Button>
                                    <Chip
                                        label={getChipLabel(index)}
                                        color={getChipColor(index)}
                                        size="small"
                                        sx={{ mt: 1 }}
                                    />
                                </Box>
                            }
                        />
                    ))}
                </Tabs>
            </Box>

            <Box sx={{ mt: 3 }}>
                {selectedTab === 0 && (
                    <LoanAllocation
                        users={users}
                        existingUser={existingUser}
                        current_fiscal_year_id={current_fiscal_year_id}
                        educational_loan_faculties={educational_loan_faculties}
                        loan_purpose_types={loan_purpose_types}
                        fiscalYears={fiscalYears}
                        loanAllocation={loanAllocation}
                        existingFiles={existingFiles}

                    /> // Render LoanAllocation component for the first tab
                )}

                {selectedTab === 1 && isLoanApproved && (
                    <PaymentAllocationForm
                        previousPayments={previousPayments}
                        current_fiscal_year_id={current_fiscal_year_id}
                        installmentPeriods={installmentPeriods}
                        paymentModes={paymentModes}
                        fiscalYears={fiscalYears}
                        loanAllocation={loanAllocation}


                    /> // Render PaymentAllocation component for the second tab
                )}
                {selectedTab === 2 && isLoanFullyPaid && (
                    <PaymentReimbursementForm
                        previousReimbursements={previousReimbursements}
                        current_fiscal_year_id={current_fiscal_year_id}
                        installmentPeriods={installmentPeriods}
                        fiscalYears={fiscalYears}
                        reimbursementPayment={reimbursementPayment}


                    /> // Render PaymentAllocation component for the second tab
                )}

            </Box>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </AuthenticatedLayout>
    );
};

export default LoanAllocationForm;
