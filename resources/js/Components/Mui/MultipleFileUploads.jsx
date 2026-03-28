import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Typography,
    ImageList,
    ImageListItem,
    IconButton,
    Card,
    CardContent,
} from '@mui/material';
import { CloudUpload, Close, PictureAsPdf, Description } from '@mui/icons-material';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const MultipleFileUploads = ({ fileName, existingFiles = [], onFileChange, onRemoveFile, deleteFileRoute }) => {
    const [files, setFiles] = useState([]);

    // Populate files with existing files on mount
    useEffect(() => {
        if (existingFiles.length > 0) {
            const formattedFiles = existingFiles.map(file => ({
                id: file.id,
                name: file.name,
                type: file.type || getMimeType(file.name),
                url: file.url,
            }));
            setFiles(formattedFiles);
        }
    }, [existingFiles]);

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files).map((file) => ({
            id: null, // For new files, id is null
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file), // Create object URL for preview
            file, // Store actual file for further processing
        }));
        onFileChange(newFiles); // Pass the new files to parent component
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleRemoveFile = (fileIdOrIndex) => {
        // Remove file from local state
        setFiles((prevFiles) =>
            prevFiles.filter((file, index) =>
                file.id ? file.id !== fileIdOrIndex : index !== fileIdOrIndex
            )
        );

        // If the file exists on the server, send a delete request via the dynamic route
        if (fileIdOrIndex !== null && typeof fileIdOrIndex === 'number') {
            onRemoveFile(fileIdOrIndex); // Call parent function to handle file deletion
        }
    };

    // Render file preview based on its type
    const renderFilePreview = (file) => {
        if (file.type.startsWith('image/')) {
            return <img src={file.url} alt={file.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
        } else if (file.type === 'application/pdf') {
            return <PictureAsPdf sx={{ fontSize: 50, color: 'red' }} />;
        } else {
            return <Description sx={{ fontSize: 50, color: 'blue' }} />;
        }
    };

    // Utility function to guess MIME type based on file extension
    const getMimeType = (filename) => {
        const ext = filename.split('.').pop().toLowerCase();
        const mimeTypes = {
            'pdf': 'application/pdf',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
        };
        return mimeTypes[ext] || 'application/octet-stream';
    };

    return (
        <Card sx={{ width: '100%', marginTop: 5, marginLeft: 2 }}>
            <Button
                variant="contained"
                sx={{
                    ml: 2,
                    backgroundColor: 'purple',
                    '&:hover': { backgroundColor: 'darkviolet' },
                }}
                endIcon={<ContactMailIcon />}
            >
                {fileName}
            </Button>
            <CardContent>
                <Grid container spacing={2} ml={3} xs={12}>
                    {files.length > 0 ? (
                        <ImageList cols={3} rowHeight={164}>
                            {files.map((file, index) => (
                                <ImageListItem key={file.id || index}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            p: 2,
                                            border: '1px solid #ccc',
                                            borderRadius: 1,
                                            position: 'relative',
                                        }}
                                    >
                                        {renderFilePreview(file)}
                                        <IconButton
                                            onClick={() => handleRemoveFile(file.id || index)}
                                            sx={{ position: 'absolute', top: 5, right: 5 }}
                                        >
                                            <Close />
                                        </IconButton>
                                        <Typography variant="caption" noWrap>
                                            {file.name}
                                        </Typography>
                                    </Box>
                                </ImageListItem>
                            ))}
                        </ImageList>
                    ) : (
                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary">
                                No files uploaded yet.
                            </Typography>
                        </Grid>
                    )}
                </Grid>
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUpload />}
                    sx={{ mt: 2, ml: 3 }}
                >
                    आवश्यक फाइलहरु अपलोड गर्नुहोस
                    <input
                        type="file"
                        hidden
                        multiple
                        onChange={handleFileChange}
                    />
                </Button>
            </CardContent>
        </Card>
    );
};

export default MultipleFileUploads;
