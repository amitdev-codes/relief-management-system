import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useInertiaForm from '@/hooks/loan/loanAllocation/loanReimbursementForm/useInertiaForm';
import ReimbursementDetailModal from './ReimbursementDetailModal';



const PaymentRemibursementSection = ({
    PaymentReimbursement,
    previousReimbursements,
    formState,
    installmentPeriods,
    fiscalYears,
    loanAllocation,
    errors,
}) => {
    const [paymentReimbursementDetails, setPaymentReimbursementDetails] = useState(previousReimbursements);
    const [isReimbursementModalOpen, setIsReimbursementModalOpen] = useState(false);
    const [editingPaymentReimbursementDetail, setEditingPaymentReimbursementDetail] = useState(null);

    const { handleSubmit, handleDeletePaymentDetail } = useInertiaForm(paymentReimbursementDetails, setPaymentReimbursementDetails); // Call custom hook

    // console.log(formState)


    const handleOpenPaymentModal = () => {
        setIsReimbursementModalOpen(true);
        setEditingPaymentReimbursementDetail(null);
    };

    const handleCloseReimbursementModal = () => {
        setIsReimbursementModalOpen(false);
        setEditingPaymentReimbursementDetail(null);
    };

    // const handleSavePaymentReimbursementDetail = (detail) => {
    //     setPaymentReimbursementDetails(prevDetails => {
    //         let newDetails;
    //         if (editingPaymentReimbursementDetail) {
    //             newDetails = prevDetails.map(d => d.id === editingPaymentReimbursementDetail.id ? detail : d);
    //         } else {
    //             newDetails = [...prevDetails, detail];
    //         }
    //         console.log('New payment reimbursement details:', newDetails); // Add this log
    //         return newDetails;
    //     });
    //     setIsReimbursementModalOpen(false);
    //     setEditingPaymentReimbursementDetail(null);
    // };

    const handleSavePaymentReimbursementDetail = (detail) => {
        handleSubmit(detail);
    };

    const handleEditPaymentDetail = (detail) => {
        // #call edit
        setEditingPaymentReimbursementDetail(detail);
        setIsReimbursementModalOpen(true);
    };
    const handleDelete = (id) => {
        handleDeletePaymentDetail(id);
    };


    const columns = [
        {
            field: 'fiscal_year_id', headerName: 'आर्थिक वर्ष', flex: 1,
            valueGetter: (params) => {
                const fiscal_year = fiscalYears.find(source => source.id == params);
                return fiscal_year ? fiscal_year.code : 'Unknown';
            }
        },
        { field: 'loan_distribution_date_bs', headerName: 'ऋण उपलब्ध मिति', width: 150 },
        {
            field: 'installment_id',
            headerName: 'किस्ता',
            flex: 1,
            valueGetter: (params) => {
                const installment = installmentPeriods.find(source => source.id == params);
                return installment ? installment.name_np : 'Unknown';
            }
        },
        { field: 'installment_percentage', headerName: 'ऋणको प्रतिसत', flex: 1 },
        { field: 'installment_amount', headerName: 'ऋणको रकम', flex: 1 },
        { field: 'installment_due_date_bs', headerName: 'ऋण फिर्ता मिति', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <>
                    <IconButton
                        onClick={() => handleEditPaymentDetail(params.row)}
                        size="small"
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDelete(params.row.id)}
                        size="small"
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Grid item xs={12}>
            <Box sx={{ width: '100%', typography: 'body1' }} >
                <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        ऋणको किस्ता  बिवरण
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenPaymentModal}
                    >
                        Add Payment Detail
                    </Button>
                </Grid>
            </Box>

            <DataGrid
                rows={paymentReimbursementDetails}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                disableSelectionOnClick
            />

            <ReimbursementDetailModal
                formState={formState}
                open={isReimbursementModalOpen}
                onClose={handleCloseReimbursementModal}
                onSave={handleSavePaymentReimbursementDetail}
                detail={editingPaymentReimbursementDetail}
                installmentPeriods={installmentPeriods}
                fiscalYears={fiscalYears}
                loan_allocation_id={loanAllocation}
                editingPaymentReimbursementDetail={editingPaymentReimbursementDetail}
                setPaymentReimbursementDetails={setPaymentReimbursementDetails}
                handleSubmit={handleSubmit}
                PaymentReimbursement={PaymentReimbursement}
            />
        </Grid>
    );
};

export default PaymentRemibursementSection;
