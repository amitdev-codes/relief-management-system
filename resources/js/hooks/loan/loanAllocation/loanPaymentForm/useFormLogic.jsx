import { useState, useEffect } from "react";
import { NepaliDateConverter } from 'react-nepali-date-picker-lite';
import FetchConvertedDate from '@/helper/FetchConvertedDate';
const useFormLogic = (initialData = {}, current_fiscal_year_id, loanAllocation = {}) => {

    const loan_distribution_date_bs = NepaliDateConverter.getNepaliDate();
    const loan_distribution_date = FetchConvertedDate.getConvertedDateBS2AD(loan_distribution_date_bs);

    const installment_due_date_bs = FetchConvertedDate.getDateFromToday(365);
    const installment_due_date = FetchConvertedDate.getConvertedDateBS2AD(installment_due_date_bs);

    const [formState, setFormState] = useState({
        // Initialize all form fields here
        user_id: loanAllocation.user_id || '',
        fiscal_year_id: initialData.fiscal_year_id || current_fiscal_year_id,
        loan_allocation_id: loanAllocation.id,
        loan_distribution_date_bs: initialData.loan_distribution_date_bs || loan_distribution_date_bs,
        loan_distribution_date: initialData.loan_distribution_date || loan_distribution_date,
        payment_source_id: initialData.payment_source_id || '2',
        receipt_no: initialData.receipt_no || '',
        installment_id: initialData.installment_id || '2',
        installment_amount: initialData.installment_amount || '',
        loan_description: initialData.loan_description || '',
        installment_due_date_bs: initialData.installment_due_date_bs || installment_due_date_bs,
        installment_due_date: initialData.installment_due_date || installment_due_date,
        interest_rate: loanAllocation.interest_rate,
    });

    // console.log(formState)



    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };
    // const handleDateChange = (name, date) => {
    //     setFormState(prev => ({ ...prev, [name]: date }));
    // };

    const handleDateChange = (name, date) => {
        const adFieldName = name.replace('_bs', '');
        const adDate = FetchConvertedDate.getConvertedDateBS2AD(date);
        setFormState(prevState => ({
            ...prevState,
            [name]: date,
            [adFieldName]: adDate,
        }));
    };

    return { formState, handleChange, handleDateChange };
};
export default useFormLogic;
