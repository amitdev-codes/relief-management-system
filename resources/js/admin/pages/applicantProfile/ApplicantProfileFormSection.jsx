import { Box, Card, CardContent, Grid, Button } from '@mui/material';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import useFormLogic from '@/hooks/applicantProfile/useFormLogic';
import useInertiaForm from '@/hooks/applicantProfile/useInertiaForm';
import PersonalDetailsSection from '@/admin/Components/applicantProfile/PersonalDetailsSection';
import AddressDetailsSection from '@/admin/Components/applicantProfile/AddressDetailsSection';
import ContactInfoSection from '@/admin/Components/applicantProfile/ContactInfoSection';
import FileUploadSection from '@/admin/Components/applicantProfile/FileUploadSection';
import RemarksDetailSection from '@/admin/Components/applicantProfile/RemarksDetailSection';

const ApplicantProfileFormSection = () => {
    const { applicantProfile = {}, existingFiles, existingPhoto = {}, religions, mothertongues, citizenshipDistricts, provinces, countries, address, genders } = usePage().props;

    const { formState, handlePhotoChange, handleRemovePhoto, handleChange, handleDateChange, handleFileChange, handleRemoveFile } = useFormLogic(applicantProfile, existingPhoto, existingFiles);
    const { handleSubmit, errors, processing } = useInertiaForm(formState, applicantProfile);

    // Check if applicantProfile has any relevant data
    const isEditing = Object.keys(applicantProfile).length > 0;

    return (
        <AuthenticatedLayout>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ fontFamily: "Kalimati" }}>
                <Button variant="contained" color="success" sx={{ ml: 2 }} endIcon={<ContactMailIcon />}>
                    {isEditing ? 'Edit Applicant Profile' : 'Create Applicant Profile'}
                </Button>

                <Card sx={{ mb: 3, overflow: 'visible', mt: 3 }}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <PersonalDetailsSection
                                formState={formState}
                                applicantProfile={applicantProfile}
                                handleChange={handleChange}
                                handleDateChange={handleDateChange}
                                handlePhotoChange={handlePhotoChange}
                                handleRemovePhoto={handleRemovePhoto}
                                religions={religions}
                                mothertongues={mothertongues}
                                countries={countries}
                                genders={genders}
                                errors={errors}
                            />
                            <AddressDetailsSection
                                formState={formState}
                                handleChange={handleChange}
                                handleDateChange={handleDateChange}
                                provinces={provinces}
                                staticData={address}
                                errors={errors}
                            />
                            <ContactInfoSection
                                formState={formState}
                                citizenshipDistricts={citizenshipDistricts}
                                staticData={address}
                                handleChange={handleChange}
                                handleDateChange={handleDateChange}
                                errors={errors}
                            />
                            <FileUploadSection
                                files={formState.files}
                                handleFileChange={handleFileChange}
                                handleRemoveFile={handleRemoveFile}
                                errors={errors}
                                fileName={"आवस्यक कागजातहरु "}
                            />
                            <RemarksDetailSection
                                formState={formState}
                                handleChange={handleChange}
                                errors={errors}
                            />
                        </Grid>
                    </CardContent>
                </Card>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={processing}
                    >
                        {processing ? (applicantProfile.id ? 'Updating...' : 'Saving...') : (applicantProfile.id ? 'Update' : 'Create')}
                    </Button>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
};

export default ApplicantProfileFormSection;
