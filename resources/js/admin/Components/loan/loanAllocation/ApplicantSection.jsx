import { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import UserSelectionModal from '../../UserSelectionModal';

const ApplicantSection = ({ formState, handleChange, users, existingUser, loanAllocation, errors }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userNames, setUserNames] = useState('');

    useEffect(() => {
        if (formState.user_id) {
            setUserNames(existingUser);
        }

    }, [])



    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleSelectUser = (users) => {
        const ids = users.map(user => user.id);
        const names = users.map(user => user.full_name).join(', ');
        handleChange({ target: { name: 'user_id', value: ids } });
        setUserNames(names);
        handleCloseModal();
    };

    return (
        <>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    आवेदक छान्नुहोस्
                </Button>
            </Grid>
            <Grid item xs={12} sm={3} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    required
                    label="आवेदक  आईडी "
                    name="user_id"
                    size="small"
                    value={formState.user_id}
                    onChange={handleChange}
                    error={!!errors.user_id}
                    helperText={errors.user_id}
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{
                        sx: {
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                        },
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={3} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    size="small"
                    label="पुरा नाम"
                    value={userNames}
                    onChange={(e) => setUserNames(e.target.value)}
                    InputProps={{ readOnly: true }}
                />
            </Grid>
            <UserSelectionModal
                open={isModalOpen}
                onClose={handleCloseModal}
                users={users}
                onSelectUser={handleSelectUser}
            />
        </>
    );
};
export default ApplicantSection;
