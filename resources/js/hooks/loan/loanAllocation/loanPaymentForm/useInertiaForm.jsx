import { useState } from 'react';
import { router } from '@inertiajs/react';
import toastr from 'toastr';

const useInertiaForm = (paymentDetails, setPaymentDetails) => {
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (data) => {
        setProcessing(true);
        const formData = new FormData();
        // Append all form fields to formData
        Object.keys(data).forEach(key => {
            if (key === 'paymentDetails') {
                data[key].forEach((detail) => {
                    // formData.append(`multiple_file_uploads[${index}]`, file);
                    formData.append(`paymentDetails[${detailKey}]`, detail[detailKey]);
                });
            } else {
                formData.append(key, data[key]);
            }
        });

        const url = data.id
            ? route('loanPayments.update', data.id)
            : route('loanPayments.store');

        if (data.id) {
            formData.append('_method', 'PUT');
        }



        router.post(url, formData, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                toastr.success('Loan Payments saved successfully');
                setErrors({});
            },
            onError: (errors) => {
                setErrors(errors);
                window.scrollTo(0, 0);
            },
            onFinish: () => setProcessing(false),
        });
    };

    const handleDeletePaymentDetail = (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            const deleteUrl = route('loanPayments.destroy', id); // Use the named route and pass the ID

            router.delete(deleteUrl, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    toastr.success('Loan Payment  detail deleted successfully');
                    setPaymentDetails(prevDetails =>
                        prevDetails.filter(d => d.id !== id)
                    );
                },
                onError: (errors) => {
                    toastr.error('Failed to delete the payment reimbursement detail.');
                }
            });
        }
    };

    return { handleSubmit, handleDeletePaymentDetail, errors, processing };
};

export default useInertiaForm;
