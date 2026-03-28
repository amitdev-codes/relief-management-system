import { useState, useEffect } from "react";
const useFormLogic = (initialData = {}, existingFiles, current_fiscal_year_id) => {
    const [formState, setFormState] = useState({
        // Initialize all form fields here
        user_id: initialData.user_id || '',
        userNames: initialData.userNames || '',
        fiscal_year_id: initialData.fiscal_year_id || current_fiscal_year_id,

        loan_asked_date_bs: initialData.loan_asked_date_bs || '',
        loan_asked_date: initialData.loan_asked_date || '',

        loan_provided_date_bs: initialData.loan_provided_date_bs || '',
        loan_provided_date: initialData.loan_provided_date || '',

        loan_purpose_type_id: initialData.loan_purpose_type_id || '2',
        loan_educational_faculty_type_id: initialData.loan_educational_faculty_type_id || '',
        institute_name: initialData.institute_name || '',
        loan_allocated_amount: initialData.loan_allocated_amount || '',
        loan_asked_amount: initialData.loan_asked_amount || '',
        loan_approved_amount: initialData.loan_approved_amount || '',

        remarks: initialData.remarks || '',

        remaining_amount: initialData.remaining_amount || '',
        loan_repayment_period: initialData.loan_repayment_period || '',
        interest_rate: initialData.interest_rate || '',
        status: initialData.status || true,

        files: [],
    });







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

    const handleStatusChange = (event) => {
        const { checked } = event.target; // Get the checked value directly
        setFormState(prev => ({ ...prev, status: checked })); // Update loanStatus in formState
    };

    const handleDateChange = (name, date) => {
        setFormState(prev => ({ ...prev, [name]: date }));
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

    return { formState, handleChange, handleStatusChange, handleDateChange, handleFileChange, handleRemoveFile };
};
export default useFormLogic;
