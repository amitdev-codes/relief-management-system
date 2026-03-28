import { useState, useEffect } from "react";
const useFormLogic = (initialData = {}, existingPhoto = {}, existingFiles = []) => {

    const [formState, setFormState] = useState({
        // Initialize all form fields here
        mobile_number: initialData.mobile_number || '',
        email: initialData.email || '',

        first_name: initialData.first_name || '',
        middle_name: initialData.middle_name || '',
        last_name: initialData.last_name || '',
        first_name_np: initialData.first_name_np || '',
        middle_name_np: initialData.middle_name_np || '',
        last_name_np: initialData.last_name_np || '',
        dob: initialData.dob || '',

        phone: initialData.phone || '',
        country_id: initialData.country_id || '11',
        religion_id: initialData.religion_id || '1',
        mothertongue_id: initialData.mothertongue_id || '1',
        gender_id: initialData.gender_id || '1',

        new_province: initialData.new_province || '',
        new_district: initialData.new_district || '',
        new_local_level: initialData.new_local_level || '',
        new_ward: initialData.new_ward || '',
        new_street_name: initialData.new_street_name || '',
        old_province: initialData.old_province || '',

        old_district: initialData.old_district || '',
        old_local_level: initialData.old_local_level || '',
        old_ward: initialData.old_ward || '',
        old_street_name: initialData.old_street_name || '',
        citizenship_no: initialData.citizenship_no || '',
        citizenship_issued_district: initialData.citizenship_issued_district || '',

        citizenship_issued_date_bs: initialData.citizenship_issued_date_bs || '',
        family_count: initialData.family_count || '',
        remarks: initialData.remarks || '',
        photo: initialData.photo || '',
        files: [],
    });



    useEffect(() => {
        if (existingPhoto) {
            setFormState(prevState => ({
                ...prevState,
                photo: existingPhoto
            }));
        }
    }, [existingPhoto]);

    const handlePhotoChange = (file) => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setFormState(prev => ({
                ...prev,
                photo: {
                    file,
                    preview: objectUrl
                }
            }));
        }
    };

    useEffect(() => {
        return () => {
            if (formState.photo?.preview) {
                URL.revokeObjectURL(formState.photo.preview);
            }
        };
    }, [formState.photo]);

    const handleRemovePhoto = () => {
        setFormState(prev => ({
            ...prev,
            photo: null,
        }));
    };

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

    const handleDateChange = (fieldName, date) => {
        setFormState(prev => ({ ...prev, [fieldName]: date }));

    };

    const handleFileChange = (newFiles) => {
        setFormState(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
    };

    const handleRemoveFile = (fileIdOrIndex) => {
        setFormState(prev => ({
            ...prev,
            files: prev.files.filter((file, index) =>
                file.id ? file.id !== fileIdOrIndex : index !== fileIdOrIndex
            ),
            removedFiles: prev.removedFiles
                ? [...prev.removedFiles, fileIdOrIndex]  // Add removed file ID or index to the array
                : [fileIdOrIndex]
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

    return {
        formState, handlePhotoChange, handleRemovePhoto, handleChange, handleDateChange, handleFileChange, handleRemoveFile
    };
};
export default useFormLogic;
