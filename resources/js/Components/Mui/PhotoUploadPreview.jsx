import { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { PhotoCamera, Close, ArrowUpward } from '@mui/icons-material';

const PhotoUploadPreview = ({ photo, handlePhotoChange, onRemovePhoto, error }) => {


    const isUrl = typeof photo === 'string';
    const isObject = typeof photo === 'object' && photo !== null;

    const handleFileChange = (event) => {

        const file = event.target.files[0];
        if (file && typeof handlePhotoChange === 'function') {
            handlePhotoChange(file);
        } else {
            console.error('handlePhotoChange is not a function or no file selected');
        }
    };



    const photoSrc = isUrl ? photo : isObject ? photo.preview : null;
    // console.log(photoSrc)



    return (
        <Box
            sx={{
                width: 200,
                height: 200,
                position: 'relative',
                border: '1px solid #ccc',
                borderRadius: 2,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
            }}
        >
            {photoSrc ? (
                <>
                    <img
                        src={photoSrc}
                        alt={photo.file?.name || 'Profile photo'}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                    <IconButton
                        onClick={onRemovePhoto}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            },
                        }}
                    >
                        <Close />
                    </IconButton>
                </>
            ) : (
                <Box
                    component="label"
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                    />
                    <PhotoCamera sx={{ fontSize: 60, color: 'action.active' }} />
                    <ArrowUpward sx={{ fontSize: 40, color: 'action.active', mt: 1 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Upload Photo
                    </Typography>
                </Box>
            )}
            {error && (
                <Typography
                    variant="caption"
                    color="error"
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        textAlign: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        padding: 0.5,
                    }}
                >
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default PhotoUploadPreview;
