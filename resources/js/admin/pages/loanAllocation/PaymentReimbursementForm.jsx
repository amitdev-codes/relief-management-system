import { useState } from 'react';
import { Box, Card, CardContent, Grid, Button } from '@mui/material';
import useFormLogic from '@/hooks/loan/loanAllocation/loanReimbursementForm/useFormLogic';
import useInertiaForm from '@/hooks/loan/loanAllocation/loanReimbursementForm/useInertiaForm';
import { usePage } from '@inertiajs/react';
import PaymentReimbursementSection from '@/admin/Components/loan/loanAllocation/PaymentReimbursementSection';
const PaymentReimbursementForm = () => {
    const { previousReimbursements, current_fiscal_year_id, installmentPeriods, fiscalYears, PaymentReimbursement = {}, loanAllocation = {} } = usePage().props;
    const { formState, handleChange, handleDateChange, } = useFormLogic(PaymentReimbursement, current_fiscal_year_id, loanAllocation);
    const { handleSubmit, errors, processing } = useInertiaForm(formState, PaymentReimbursement);
    const [paymentReimbursementDetails, setPaymentReimbursementDetails] = useState(previousReimbursements || []);
    const handlePaymentDetailsChange = (updatedReimbursementDetails) => {
        setPaymentReimbursementDetails(updatedPaymentDetails);
        handleChange({
            target: {
                name: 'paymentReimbursementDetails',
                value: JSON.stringify(updatedReimbursementDetails)
            }
        });
    };

    return (
        <Box sx={{ p: 2, fontFamily: "Kalimati" }}>
            <PaymentReimbursementSection
                PaymentReimbursement={PaymentReimbursement}
                previousReimbursements={previousReimbursements}
                formState={formState}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                installmentPeriods={installmentPeriods}
                fiscalYears={fiscalYears}
                current_fiscal_year_id={current_fiscal_year_id}
                errors={errors}
                onPaymentDetailsChange={handlePaymentDetailsChange}
                handleSubmit={handleSubmit}
                loanAllocation={loanAllocation.id}
            />
        </Box>
    );
};

export default PaymentReimbursementForm;
