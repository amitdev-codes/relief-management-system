// components/PhotoUploadSection.js
import React from 'react';
import { Grid } from '@mui/material';
import PhotoUploadPreview from '@/Components/Mui/PhotoUploadPreview';

const PhotoUploadSection = ({ fileName, photo, handlePhotoChange, handleRemovePhoto, errors, }) => {
    return (
        <Grid item xs={12}>
            <PhotoUploadPreview
                photo={photo}
                handlePhotoChange={handlePhotoChange}
                onRemovePhoto={handleRemovePhoto}
                error={errors.photo}
            />
        </Grid>
    );
};

export default PhotoUploadSection;
