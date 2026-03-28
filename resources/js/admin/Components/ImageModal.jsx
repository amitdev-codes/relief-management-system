import React from 'react';
import ReactImageLightbox from 'react-image-lightbox';

// Ensure accessibility by specifying the root element

const ImageModal = ({ isOpen, onRequestClose, imageUrl }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    transform: 'translate(-50%, -50%)',
                    padding: '0',
                    border: 'none',
                },
            }}
        >
            <img src={imageUrl} alt="Preview" style={{ width: '100%', height: 'auto' }} />
        </Modal>
    );
};

export default ImageModal;
