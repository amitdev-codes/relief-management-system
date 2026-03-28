import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, TextField, MenuItem, Button, InputLabel, Typography } from '@mui/material';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { router, usePage, useForm } from '@inertiajs/react';
import toastr from 'toastr';
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';


const ReliefPackageForm = ({ reliefPackage = {}, relief_types = [], processedAllocations = [], processing }) => {

    const isEditMode = !!reliefPackage.id;

    const [title, setTitle] = useState(reliefPackage.incident_date || '');
    const [file_uploads, setFileUploads] = useState(reliefPackage.file_uploads || '');
    const [remarks, setRemarks] = useState(reliefPackage.remarks || '');;


    const [mst_relief_sub_categories, setMstReliefSubCategory] = useState({});
    const [reliefEntries, setReliefEntries] = useState(processedAllocations || []);
    const [errors, setErrors] = useState({});
    const [filePreview, setFilePreview] = useState(
        reliefPackage.file_uploads ? reliefPackage.file_uploads : null
    );
    const [mst_length_units, setMstLengthUnits] = useState({});

    useEffect(() => {
        if (isEditMode) {
            setReliefEntries(processedAllocations);
            setFilePreview(reliefPackage.file_uploads ? `/storage/${reliefPackage.file_uploads}` : null);
        }
    }, [isEditMode, processedAllocations, reliefPackage]);

    useEffect(() => {
        // Initialize subcategories if relief types are already present
        reliefEntries.forEach(async (entry) => {
            if (entry.relief_type_id && !mst_relief_sub_categories[entry.relief_type_id]) {
                try {
                    const response = await axios.get(`/admin/api/fetch_relief_subcategory/${entry.relief_type_id}`);
                    setMstReliefSubCategory(prev => ({
                        ...prev,
                        [entry.relief_type_id]: response.data
                    }));
                } catch (error) {
                    console.error('Error fetching subcategories:', error);
                }
            }
        });
    }, [reliefEntries, mst_relief_sub_categories]);


    // Update the state with length units in handleGridChange or wherever appropriate


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileUploads(file);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e, setter) => {
        const { name, value } = e.target;
        setter(value);
        setErrors(prev => ({ ...prev, [name]: '' }));
    };


    const addReliefEntry = () => {
        setReliefEntries([...reliefEntries, {
            relief_type_id: '',
            relief_sub_category_id: '',
            quantity: ''
        }]);
    };

    const removeReliefEntry = (index) => {
        setReliefEntries(reliefEntries.filter((_, i) => i !== index));
    };

    // Handle change in grid data
    const handleGridChange = async (index, field, value) => {
        const updatedEntries = [...reliefEntries];
        updatedEntries[index][field] = value;

        if (field === 'relief_type_id') {
            try {
                const response = await axios.get(`/admin/api/fetch_relief_subcategory/${value}`);
                const updatedSubCategories = response.data;
                setMstReliefSubCategory(prev => ({
                    ...prev,
                    [value]: updatedSubCategories
                }));
                updatedEntries[index].relief_sub_category_id = '';
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        } else if (field === 'relief_sub_category_id') {
            const selectedSubCategory = (mst_relief_sub_categories[updatedEntries[index].relief_type_id] || []).find(subCat => subCat.id === value);
            updatedEntries[index].length_unit_id = selectedSubCategory ? selectedSubCategory.length_unit_id : '';
        }

        setReliefEntries(updatedEntries);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('remarks', remarks);

        if (file_uploads instanceof File) {
            formData.append('file_uploads', file_uploads);
        }

        const singlePackageData = reliefEntries.map(entry => ({
            relief_type_id: entry.relief_type_id,
            relief_sub_category_id: entry.relief_sub_category_id,
            quantity: entry.quantity,
            length_unit_id: entry.length_unit_id
        }));
        formData.append('relief_package', JSON.stringify(singlePackageData));

        if (isEditMode) {
            formData.append('_method', 'PUT'); // For Laravel to recognize this as a PUT request
        }

        const url = isEditMode
            ? route('relief_packages.update', reliefPackage.id)
            : route('relief_packages.store');




        router.post(url, formData, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toastr.success(isEditMode ? 'Relief fund allocation updated successfully.' : 'Relief fund allocation created successfully.');
            },
            onError: (errors) => {
                setErrors(errors);
                toastr.error('Please fix the errors and try again.');
            },
        });
    };
    return (
        <AuthenticatedLayout sx={{ fontFamily: "'Kalimati', sans-serif" }}>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ fontFamily: "Kalimati", mt: 10 }}>
                <Card sx={{ mb: 3, mt: 2, overflow: 'visible' }}>
                    <CardContent>
                        {/* Single Package Form Fields */}
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    size='small'
                                    label="प्याकेज शिर्सक"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    error={!!errors.title}
                                    helperText={errors.title}
                                />
                            </Grid>

                            {/* Relief Entries */}
                            <Grid item xs={12} sm={4} sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={addReliefEntry}
                                >
                                    Add Relief Entry
                                </Button>
                            </Grid>

                            {reliefEntries.map((entry, index) => (
                                <Grid container spacing={2} key={index} ml={10}>
                                    <Grid item xs={12} sm={3} mt={2}>
                                        <TextField
                                            select
                                            size="small"
                                            required
                                            fullWidth
                                            label="राहत प्रकार"
                                            value={entry.relief_type_id || ''}
                                            onChange={(e) => handleGridChange(index, 'relief_type_id', e.target.value)}
                                        >
                                            {(relief_types || []).map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name}--{option.name_np}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={3} mt={2}>
                                        <TextField
                                            select
                                            size="small"
                                            required
                                            fullWidth
                                            label="राहत उपप्रकार"
                                            value={entry.relief_sub_category_id || ''}
                                            onChange={(e) => handleGridChange(index, 'relief_sub_category_id', e.target.value)}
                                        >
                                            {((mst_relief_sub_categories[entry.relief_type_id] || []).map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {entry.relief_type_id === 1 ? option.amount : `${option.name}--${option.name_np}`}
                                                </MenuItem>
                                            )))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={2} mt={2}>
                                        <TextField
                                            size="small"
                                            required
                                            fullWidth
                                            label="परिमाण"
                                            value={entry.quantity || ''}
                                            onChange={(e) => handleGridChange(index, 'quantity', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2} mt={2}>
                                        <TextField
                                            size="small"
                                            required
                                            fullWidth
                                            label="Length Unit"
                                            value={entry.length_unit_id && mst_length_units[entry.length_unit_id] ? mst_length_units[entry.length_unit_id].name_np : ''}
                                            InputProps={{ readOnly: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2} mt={2}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => removeReliefEntry(index)}
                                        >
                                            Remove
                                        </Button>
                                    </Grid>
                                </Grid>
                            ))}


                            {/* file uploads */}

                            <Grid item xs={12} sm={8}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="subtitle2" gutterBottom>File Uploads</Typography>

                                    <Box
                                        sx={{
                                            border: '2px solid #ccc',
                                            borderRadius: '4px',
                                            width: '100%',
                                            height: 150,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                            mb: 2
                                        }}
                                    >
                                        {filePreview ? (
                                            <img
                                                // src={filePreview}
                                                src={filePreview instanceof File ? URL.createObjectURL(filePreview) : `${filePreview}` || 'https://as2.ftcdn.net/v2/jpg/07/86/72/89/1000_F_786728988_QyuP5WkUfZMlGMEMltILI72HWVtkEyYx.jpg'}
                                                alt="File Preview"
                                                id="file_uploads"
                                                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                            />
                                        ) : (
                                            <PhotoCameraIcon sx={{ fontSize: 50 }} />
                                        )}
                                    </Box>
                                    {errors.file_uploads && (
                                        <Typography color="error">{errors.file_uploads}</Typography>
                                    )}
                                    <Button
                                        variant="contained"
                                        component="label"
                                        tabIndex={-1}
                                        size="small"
                                        role={undefined}
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        राहत  विवरण फायल अपलोड
                                        <input
                                            type="file"
                                            name='file_uploads'
                                            id='file_uploads'
                                            hidden
                                            onChange={(e) => handleFileChange(e, 'file_uploads')}
                                        />
                                    </Button>
                                </Box>
                            </Grid>
                            {/* remarks */}
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    label="कैफियत"
                                    multiline
                                    rows={4}
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    error={!!errors.remarks}
                                    helperText={errors.remarks}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={processing}
                >
                    {reliefPackage ? 'Update Relief Fund' : 'Allocate Relief Fund'}
                </Button>
            </Box>
        </AuthenticatedLayout>
    );
};

export default ReliefPackageForm;
