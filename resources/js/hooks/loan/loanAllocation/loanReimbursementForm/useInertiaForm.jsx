import { useState } from 'react';
import { router } from '@inertiajs/react';
import toastr from 'toastr';

const useInertiaForm = (PaymentReimbursement, setPaymentReimbursementDetails) => {
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (data) => {

        setProcessing(true);
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'paymentReimbursementDetails') {
                data[key].forEach((detail) => {
                    Object.keys(detail).forEach(detailKey => {
                        formData.append(`paymentReimbursementDetails[${detailKey}]`, detail[detailKey]);
                    });
                });
            } else {
                formData.append(key, data[key]);
            }
        });


        const url = data.id
            ? route('paymentReimbursementSections.update', data.id)
            : route('paymentReimbursementSections.store');

        if (data.id) {
            formData.append('_method', 'PUT');
        }
        // const method = data.id ? 'put' : 'post';

        router.post(url, formData, {
            forceFormData: true,
            onSuccess: (response) => {
                toastr.success('Payment reimbursement saved successfully');
                // Optionally update the local state with the new data
                // setPaymentReimbursementDetails(prev => [...prev, response.data]);
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
            const deleteUrl = route('paymentReimbursementSections.destroy', id); // Use the named route and pass the ID

            router.delete(deleteUrl, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    toastr.success('Payment reimbursement detail deleted successfully');
                    setPaymentReimbursementDetails(prevDetails =>
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
