import { useState } from 'react';
import { Box, Card, CardContent, Grid, Button } from '@mui/material';
import PaymentDetailsSection from '@/admin/Components/loan/loanAllocation/PaymentDetailsSection';
import useFormLogic from '@/hooks/loan/loanAllocation/loanPaymentForm/useFormLogic';
import useInertiaForm from '@/hooks/loan/loanAllocation/loanPaymentForm/useInertiaForm';
import { usePage } from '@inertiajs/react';


const PaymentAllocationForm = () => {
    const { previousPayments, current_fiscal_year_id, installmentPeriods, paymentModes, fiscalYears, loanAllocation = {}, loanPayment = {} } = usePage().props;
    const { formState, handleChange, handleDateChange, } = useFormLogic(loanPayment, current_fiscal_year_id, loanAllocation);
    const { handleSubmit, errors, processing } = useInertiaForm(formState, loanAllocation);
    const [paymentDetails, setPaymentDetails] = useState(previousPayments || []);
    const handlePaymentDetailsChange = (updatedPaymentDetails) => {
        setPaymentDetails(updatedPaymentDetails);
        handleChange({
            target: {
                name: 'paymentDetails',
                value: JSON.stringify(updatedPaymentDetails)
            }
        });
    };



    return (
        <Box sx={{ p: 2, fontFamily: "Kalimati" }}>
            <PaymentDetailsSection
                loanPayment={loanPayment}
                previousPayments={paymentDetails}
                formState={formState}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                installmentPeriods={installmentPeriods}
                paymentModes={paymentModes}
                fiscalYears={fiscalYears}
                current_fiscal_year_id={current_fiscal_year_id}
                errors={errors}
                onPaymentDetailsChange={handlePaymentDetailsChange}
                handleSubmit={handleSubmit}
            />
        </Box>
    );
};

export default PaymentAllocationForm;
