import { useEffect } from 'react';
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
import { CloudUpload, PhotoCamera, Close, PictureAsPdf, Description } from '@mui/icons-material';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const FileUploadPreview = ({ fileName, files, onFileChange, onRemoveFile }) => {
    useEffect(() => {
        // Cleanup for object URLs to prevent memory leaks
        return () => {
            files.forEach(file => {
                if (file.type.startsWith('image/') && !file.url) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, [files]);

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files).map(file => {
            file.preview = URL.createObjectURL(file); // Assign preview URL for image files
            return file;
        });
        onFileChange(newFiles);
    };

    const renderFilePreview = (file) => {
        if (file.type.startsWith('image/')) {
            return (
                <img
                    src={file.url || file.preview}
                    alt={file.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            );
        } else if (file.type === 'application/pdf') {
            return <PictureAsPdf sx={{ fontSize: 50, color: 'red' }} />;
        } else {
            return <Description sx={{ fontSize: 50, color: 'blue' }} />;
        }
    };

    return (
        <Card sx={{ width: '100%', mt: 5, ml: 2 }}>
            <Button
                variant="contained"
                sx={{
                    ml: 2,
                    backgroundColor: 'purple',
                    '&:hover': {
                        backgroundColor: 'darkviolet',
                    },
                }}
                endIcon={<ContactMailIcon />}
            >
                {fileName}
            </Button>

            <CardContent>
                <Grid container spacing={2} ml={1} sx={{ width: '100%' }}>
                    {files.length > 0 ? (
                        <Grid item xs={12}>
                            <ImageList cols={3} gap={10}>
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
                                                onClick={() => onRemoveFile(file.id || index)}
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
                        </Grid>
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

export default FileUploadPreview;
