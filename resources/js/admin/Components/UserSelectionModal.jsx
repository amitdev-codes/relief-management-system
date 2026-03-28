import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CustomToolbar from '@/Components/Mui/CustomToolbar';


const UserSelectionModal = ({ open, onClose, users, onSelectUser }) => {
    const [selectionModel, setSelectionModel] = useState([]);


    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'full_name_np', headerName: 'पुरा नाम', flex: 1 },
        { field: 'full_name', headerName: 'Name', flex: 1 },
        { field: 'mobile_number', headerName: 'Mobile', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
    ];

    const handleSelect = () => {
        const selectedUsers = users.filter((user) =>
            selectionModel.includes(user.id)
        );
        onSelectUser(selectedUsers);
    };


    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    padding: 4,
                    backgroundColor: 'white',
                    margin: 'auto',
                    marginTop: '5%',
                    width: '80%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" gutterBottom>Select Application Profile</Typography>

                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={users}
                        columns={columns}
                        pageSize={10}
                        checkboxSelection
                        disableSelectionOnClick
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}

                        onRowSelectionModelChange={(newRowSelectionModel) => {
                            setSelectionModel(newRowSelectionModel);
                        }}
                        selectionModel={selectionModel}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button onClick={onClose} sx={{ marginRight: 2 }} variant="outlined">
                        Close
                    </Button>
                    <Button onClick={handleSelect} variant="contained" color="primary">
                        Select User
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UserSelectionModal;
