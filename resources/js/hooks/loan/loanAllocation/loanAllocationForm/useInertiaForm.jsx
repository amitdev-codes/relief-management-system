import { useState } from 'react';
import { router } from '@inertiajs/react';
import toastr from 'toastr';

const useInertiaForm = (formState, loanAllocation) => {
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setProcessing(true);
        const formData = new FormData();
        // Append all form fields to formData
        Object.keys(formState).forEach(key => {
            if (key === 'files') {
                formState[key].forEach((file, index) => {
                    formData.append(`multiple_file_uploads[${index}]`, file);
                });
            } else {
                formData.append(key, formState[key]);
            }
        });
        if (loanAllocation.id) {
            formData.append('_method', 'PUT');
        }

        const url = loanAllocation.id
            ? route('loanAllocations.update', loanAllocation.id)
            : route('loanAllocations.store');

        router.post(url, formData, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                toastr.success('Loan allocation saved successfully');
                setErrors({});
            },
            onError: (errors) => {
                setErrors(errors);
                window.scrollTo(0, 0);
            },
            onFinish: () => setProcessing(false),
        });
    };

    return { handleSubmit, errors, processing };
};

export default useInertiaForm;
