import { useState } from 'react';
import { router } from '@inertiajs/react';
import toastr from 'toastr';

const useInertiaForm = (formState, applicantProfile) => {
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setProcessing(true);
        const formData = new FormData();
        Object.keys(formState).forEach(key => {
            if (key === 'files') {
                formState[key].forEach((file, index) => {
                    formData.append(`multiple_file_uploads[${index}]`, file);
                });
            } else if (key === 'photo') {
                if (formState[key] instanceof File) {
                    formData.append('photo', formState[key]);
                } else if (formState[key] && formState[key].file instanceof File) {
                    formData.append('photo', formState[key].file);
                }
            } else if (key === 'removedFiles') {
                formState[key].forEach((fileIdOrIndex, index) => {
                    formData.append(`remove_file_ids[${index}]`, fileIdOrIndex);
                });
            }
            else if (typeof formState[key] !== 'object') {
                formData.append(key, formState[key]);
            } else if (formState.removedPhoto) {
                formData.append('removed_photo', formState.removedPhoto);
            }
            else {
                // Handle other types (arrays, objects) if needed
                formData.append(key, JSON.stringify(formState[key]));
            }
        });

        if (applicantProfile.id) {
            formData.append('_method', 'PUT');
        }

        const url = applicantProfile.id
            ? route('applicantProfiles.update', applicantProfile.id)
            : route('applicantProfiles.store');

        const timeout = setTimeout(() => {
            setProcessing(false);
            toastr.error('The request timed out. Please try again.');
        }, 10000);



        router.post(url, formData, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                toastr.success('Application Profile created successfully');
                setErrors({});
                clearTimeout(timeout);
            },
            onError: (errors) => {
                setErrors(errors);
                window.scrollTo(0, 0);
                clearTimeout(timeout);
                setProcessing(false);
            },
            onFinish: () => setProcessing(false),
        });
    };

    return { handleSubmit, errors, processing };
};

export default useInertiaForm;
