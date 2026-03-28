import { useState } from 'react';
import { router } from '@inertiajs/react';
import toastr from 'toastr';

const useInertiaForm = (formState, loanClearance) => {
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setProcessing(true);
        const formData = new FormData();

        Object.keys(formState).forEach(key => {
            if (key === 'files') {
                formState[key].forEach((file, index) => {
                    if (file instanceof File) {
                        formData.append(`multiple_file_uploads[${index}]`, file);
                    }
                });
            }  else if (key === 'paymentDetails') {
                formState[key].forEach((payment, index) => {
                    Object.keys(payment).forEach(paymentKey => {
                        if (paymentKey !== 'isNew') {
                            formData.append(`paymentDetails[${index}][${paymentKey}]`, payment[paymentKey]);
                        }
                    });
                });

        }else {
                formData.append(key, formState[key]);
            }
        });


        // const { paymentDetails } = formState;
        // paymentDetails.forEach((payment, index) => {
        //     Object.keys(payment).forEach(key => {
        //         formData.append(`paymentDetails[${index}][${key}]`, payment[key]);
        //     });
        // });

        // console.log(formData)

        const url = route('loanClearances.update', loanClearance.id);
        formData.append('_method', 'PUT');

        router.post(url, formData, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                toastr.success('Loan clearance saved successfully');
                setErrors({});
            },
            onError: (errors) => {
                setErrors(errors);
                window.scrollTo(0, 0);
            },
        });
    };

    return { handleSubmit, errors, processing };
};

export default useInertiaForm;
