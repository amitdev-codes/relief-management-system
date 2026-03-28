import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, TextField, MenuItem, Button, Typography, Container, InputAdornment, InputLabel, Tabs, Tab } from '@mui/material';
import { useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import toastr from 'toastr';
import SinglePackageForm from './SinglePackageForm';
import MultiplePackageForm from './MultiplePackageForm';

const ReliefAllocationForm = () => {
    const { relief_types, relief_packages, reliefFundAllocation, processing, users, mst_relief_sub_categories } = usePage().props;
    const isEditMode = reliefFundAllocation && reliefFundAllocation.id !== undefined;

    const [incident_date, setIncidentDate] = useState(reliefFundAllocation ? reliefFundAllocation.incident_date : '');
    const [incident_description, setIncidentDescription] = useState(reliefFundAllocation ? reliefFundAllocation.incident_description : '');
    const [relief_type_id, setReliefTypeId] = useState(reliefFundAllocation ? reliefFundAllocation.relief_type_id : '');
    const [quantity, setQuantity] = useState(reliefFundAllocation ? reliefFundAllocation.quantity : '');
    const [file_uploads, setFileUploads] = useState(reliefFundAllocation ? reliefFundAllocation.file_uploads : '');
    const [remarks, setRemarks] = useState(reliefFundAllocation ? reliefFundAllocation.remarks : '');
    const [errors, setErrors] = useState({});
    const [filePreview, setFilePreview] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);

    const handleIncidentDateChange = (date) => {
        setIncidentDate(date);
        setErrors({ incident_date: date ? '' : 'Incident Date is required' });
    };

    const handleFileChange = (event, name) => {
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

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('incident_date', incident_date);
        formData.append('incident_description', incident_description);
        formData.append('relief_type_id', relief_type_id);
        formData.append('quantity', quantity);
        formData.append('remarks', remarks);
        if (file_uploads) {
            formData.append('file_uploads', file_uploads);
        }

        const method = reliefFundAllocation ? 'PUT' : 'POST';
        const url = reliefFundAllocation
            ? route('reliefFundAllocations.update', reliefFundAllocation.id)
            : route('reliefFundAllocations.store');

        formData.append('_method', method);
        router.post(url, formData, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                toastr.success(reliefFundAllocation ? 'Relief fund Updated successfully' : 'Relief fund allocated created successfully');
                setErrors({});
            },
            onError: (errors) => {
                setErrors(errors);
                window.scrollTo(0, 0);
            },
        });
    };

    return (
        <AuthenticatedLayout sx={{ fontFamily: "'Kalimati', sans-serif" }}>
            <Box sx={{ width: '100%', typography: 'body1', mt: 4 }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    centered
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab label="Single Package" />
                    <Tab label="Multiple Package" />
                </Tabs>

                <Box sx={{ mt: 3 }}>
                    {selectedTab === 0 && (
                        <SinglePackageForm
                            relief_types={relief_types}
                            // mst_relief_sub_categories={mst_relief_sub_categories}
                            users={users}
                            reliefFundAllocation={reliefFundAllocation}
                            processing={processing}
                        />
                    )}

                    {selectedTab === 1 && (
                        <MultiplePackageForm
                            users={users}
                            relief_types={relief_types}
                            relief_packages={relief_packages}
                            reliefFundAllocation={reliefFundAllocation}
                            processing={processing}
                        />
                    )}
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
};

export default ReliefAllocationForm;
