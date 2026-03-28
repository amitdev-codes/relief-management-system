// components/FileUploadSection.js
import React from 'react';
import { Grid } from '@mui/material';
import FileUploadPreview from '@/admin/Components/FileUploadPreview';

const FileUploadSection = ({ files, handleFileChange, handleRemoveFile, errors }) => {
    return (
        <Grid item xs={12}>
            <FileUploadPreview
                fileName="ऋण विवरण फायल अपलोड"
                files={files}
                onFileChange={handleFileChange}
                onRemoveFile={handleRemoveFile}
                error={errors.files}
            />
        </Grid>
    );
};

export default FileUploadSection;
