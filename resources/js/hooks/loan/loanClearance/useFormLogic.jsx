import { useState, useEffect } from "react";
import { NepaliDateConverter } from 'react-nepali-date-picker-lite';
import FetchConvertedDate from '@/helper/FetchConvertedDate';
const useFormLogic = (initialData = {}, existingFiles, current_fiscal_year_id) => {

    const loan_clearance_date_bs = NepaliDateConverter.getNepaliDate();
    const loan_clearance_date = FetchConvertedDate.getConvertedDateBS2AD(loan_clearance_date_bs);



    const [formState, setFormState] = useState({
        // Initialize all form fields here
        user_id: initialData.user_id || '',
        fiscal_year_id: initialData.fiscal_year_id || current_fiscal_year_id,
        loan_clearance_id: initialData.id,
        loan_activation_date_bs: initialData.loan_activation_date_bs || '',
        loan_activation_date: initialData.loan_activation_date_bs || '',
        loan_clearance_date_bs: initialData.loan_clearance_date_bs || loan_clearance_date_bs,
        loan_clearance_date: initialData.loan_clearance_date_bs || loan_clearance_date,
        loan_allocated_amount: initialData.loan_allocated_amount || '',
        loan_approved_amount: initialData.loan_approved_amount || '',
        loan_purpose_type_id: initialData.loan_purpose_type_id || '',
        loan_educational_faculty_type_id: initialData.loan_educational_faculty_type_id || '',
        remaining_loan_clearance_amount: initialData.remaining_loan_clearance_amount || '',
        loan_repayment_period: initialData.loan_repayment_period || '',
        loan_interest_rate: initialData.loan_interest_rate || '',
        remarks: initialData.remarks || '',
        loan_status: initialData.loan_status || '',
        files: [],
        paymentDetails: initialData.paymentDetails || [],
    });

    console.log(formState)



    useEffect(() => {
        if (existingFiles && existingFiles.length > 0) {
            const formattedFiles = existingFiles.map(file => ({
                id: file.id,
                name: file.name,
                type: file.type || getMimeType(file.name),
                url: file.url,
            }));

            setFormState(prevState => ({
                ...prevState,
                files: formattedFiles
            }));
        }
    }, [existingFiles]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (name, date) => {
        const adFieldName = name.replace('_bs', '');
        const adDate = FetchConvertedDate.getConvertedDateBS2AD(date);
        setFormState(prevState => ({
            ...prevState,
            [name]: date,
            [adFieldName]: adDate,
        }));
    };
    const handleFileChange = (newFiles) => {
        setFormState(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
    };

    const handleRemoveFile = (fileIdOrIndex) => {
        setFormState(prev => ({
            ...prev,
            files: prev.files.filter((file, index) =>
                file.id ? file.id !== fileIdOrIndex : index !== fileIdOrIndex
            )
        }));
    };

    // const onPaymentDetailsChange = (newPaymentDetails) => {
    //     setFormState(prev => ({
    //         ...prev,
    //         paymentDetails: newPaymentDetails // Replace with new payment details
    //     }));
    // }
    
    const onPaymentDetailsChange = (newPaymentDetails) => {
        setFormState(prev => ({
            ...prev,
            paymentDetails: newPaymentDetails.map(payment => {
                if (payment.id && !payment.id.toString().startsWith('new_')) {
                    // Existing payment
                    return { ...payment };
                } else {
                    // New payment
                    const { id, ...paymentWithoutId } = payment;
                    return { ...paymentWithoutId, isNew: true };
                }
            })
        }));
    };



    const getMimeType = (filename) => {
        const ext = filename.split('.').pop().toLowerCase();
        const mimeTypes = {
            'pdf': 'application/pdf',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            // Add more as needed
        };
        return mimeTypes[ext] || 'application/octet-stream';
    };

    return { formState, handleChange, handleDateChange, handleFileChange, handleRemoveFile, onPaymentDetailsChange };
};
export default useFormLogic;
