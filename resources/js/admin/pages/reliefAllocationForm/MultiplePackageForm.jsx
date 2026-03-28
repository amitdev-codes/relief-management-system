import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, TextField, MenuItem, Button, InputLabel, Typography } from '@mui/material';
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UserSelectionModal from './UserSelectionModal';
import { router, usePage, useForm } from '@inertiajs/react';
import toastr from 'toastr';

const MultiplePackageForm = ({ processedAllocations = [], relief_packages, reliefFundAllocation = {}, users = [], processing }) => {

    const isEditMode = !!reliefFundAllocation.id;

    const [incident_date, setIncidentDate] = useState(reliefFundAllocation.incident_date || '');
    const [incident_description, setIncidentDescription] = useState(reliefFundAllocation.incident_description || '');
    const [package_type_id, setPackageTypeId] = useState(reliefFundAllocation.package_type_id || '');
    const [file_uploads, setFileUploads] = useState(reliefFundAllocation.file_uploads || '');
    const [remarks, setRemarks] = useState(reliefFundAllocation.remarks || '');;
    const [applicant_ids, setApplicantId] = useState(reliefFundAllocation.applicant_ids || '');
    const [userNames, setUserNames] = useState(reliefFundAllocation.applicant_names || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [errors, setErrors] = useState({});
    const [filePreview, setFilePreview] = useState(
        reliefFundAllocation.file_uploads ? reliefFundAllocation.file_uploads : null
    );

    useEffect(() => {
        if (isEditMode) {
            setFilePreview(reliefFundAllocation.file_uploads ? `/storage/${reliefFundAllocation.file_uploads}` : null);
        }
    }, [isEditMode, processedAllocations, reliefFundAllocation]);


    const handleIncidentDateChange = (date) => {
        setIncidentDate(date);
        setErrors({ incident_date: date ? '' : 'Incident Date is required' });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileUploads(file);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleSelectUser = (users) => {
        const ids = users.map(user => user.id).join(', ');
        const names = users.map(user => user.name).join(', ');
        setApplicantId(ids);
        setUserNames(names);
        handleCloseModal();
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('incident_date', incident_date);
        formData.append('applicant_ids', JSON.stringify(applicant_ids.split(',').map(id => id.trim())));
        formData.append('incident_description', incident_description);
        formData.append('remarks', remarks);
        formData.append('package_type_id', package_type_id);
        if (file_uploads instanceof File) {
            formData.append('file_uploads', file_uploads);
        }

        if (isEditMode) {
            formData.append('_method', 'PUT'); // For Laravel to recognize this as a PUT request
        }

        const url = isEditMode
            ? route('reliefFundAllocations.update', reliefFundAllocation.id)
            : route('reliefFundAllocations.store');

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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ fontFamily: "Kalimati", mt: 2 }}>
            <Card sx={{ mb: 3, mt: 2, overflow: 'visible' }}>
                <CardContent>
                    {/* Single Package Form Fields */}
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4} sx={{ mt: 2 }} >
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                    '& .nepali-date-picker': {
                                        width: '100%',
                                    },
                                    '& .nepali-date-picker input': {
                                        width: '100%',
                                        height: '40px',
                                        padding: '8.5px 14px',
                                        paddingRight: '36px', // Make space for the calendar icon
                                        fontSize: '0.875rem',
                                        borderRadius: '4px',
                                        border: '1px solid rgba(0, 0, 0, 0.23)',
                                        transition: 'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                        '&:focus': {
                                            borderColor: '#1976d2',
                                            boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                                        },
                                    },
                                    '& .calendar-icon': {
                                        position: 'absolute',
                                        right: '8px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        pointerEvents: 'none',
                                        color: 'rgba(0, 0, 0, 0.54)',
                                    },
                                }}
                            >
                                <InputLabel
                                    shrink
                                    sx={{
                                        position: 'absolute',
                                        top: '-8px',
                                        left: '14px',
                                        backgroundColor: 'white',
                                        padding: '0 4px',
                                        fontSize: '0.75rem',
                                        color: 'rgba(0, 0, 0, 0.6)',
                                        transform: 'translateY(-50%)',
                                        transformOrigin: 'left top',
                                    }}
                                >
                                    राहत माग विवरण मिति
                                </InputLabel>
                                <NepaliDatePicker
                                    inputClassName="form-control"
                                    className="nepali-date-picker"
                                    id="incident_date"
                                    value={incident_date}
                                    onChange={handleIncidentDateChange}
                                    options={{ calenderLocale: "ne", valueLocale: "en" }}
                                    error={!!errors.incident_date}
                                    name="incident_date"
                                    helperText={errors.incident_date}
                                />
                                <CalendarTodayIcon className="calendar-icon" fontSize="small" />
                            </Box>
                        </Grid>

                        {/* select applicant profile */}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpenModal}
                            >
                                Select Application Profile
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Applicant IDs"
                                size="small"
                                value={applicant_ids}
                                onChange={(e) => setApplicantId(e.target.value)}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="User Names"
                                value={userNames}
                                onChange={(e) => setUserNames(e.target.value)}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4} sx={{ mt: 2 }}>
                            <TextField
                                select
                                size="small"
                                required
                                fullWidth
                                label="प्याकेज प्रकार "
                                value={package_type_id}
                                onChange={(e) => setPackageTypeId(e.target.value)}
                                error={!!errors.package_type_id}
                                helperText={errors.package_type_id}
                            >
                                {relief_packages.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                label="क्षतिको विवरण"
                                multiline
                                rows={4}
                                value={incident_description}
                                onChange={(e) => setIncidentDescription(e.target.value)}
                                error={!!errors.incident_description}
                                helperText={errors.incident_description}
                            />
                        </Grid>

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
                                            src={filePreview}
                                            alt="File Preview"
                                            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                        />
                                    ) : (
                                        <Typography variant="body2">No file selected</Typography>
                                    )}
                                </Box>

                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload File
                                    <input
                                        type="file"
                                        accept="image/*, application/pdf, .docx"
                                        hidden
                                        onChange={handleFileChange}
                                    />
                                </Button>
                            </Box>
                        </Grid>

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
                {reliefFundAllocation ? 'Update Relief Fund' : 'Allocate Relief Fund'}
            </Button>
            {/* User Selection Modal */}
            <UserSelectionModal
                open={isModalOpen}
                onClose={handleCloseModal}
                users={users}
                onSelectUser={handleSelectUser}
            />
        </Box>
    );
};

export default MultiplePackageForm;
