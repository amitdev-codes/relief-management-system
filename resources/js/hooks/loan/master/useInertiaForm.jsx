import { useState } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';

const useInertiaForm = (baseUrl) => {
    const [processing, setProcessing] = useState(false);

    const handleSuccess = (message) => {
        setProcessing(false);
        toast.success(message);
    };

    const handleError = (error) => {
        setProcessing(false);
        toast.error(error || 'An error occurred');
    };

    const create = (data) => {
        setProcessing(true);
        router.post(`${baseUrl}`, data, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => handleSuccess('Item created successfully'),
            onError: (errors) => handleError(errors.message),
        });
    };

    const update = (id, data) => {
        setProcessing(true);
        router.put(`${baseUrl}/${id}`, data, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => handleSuccess('Item updated successfully'),
            onError: (errors) => handleError(errors.message),
        });
    };

    const destroy = (id) => {
        setProcessing(true);
        router.delete(`${baseUrl}/${id}`, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => handleSuccess('Item deleted successfully'),
            onError: (errors) => handleError(errors.message),
        });
    };

    return { create, update, destroy, processing };
};

export default useInertiaForm;
