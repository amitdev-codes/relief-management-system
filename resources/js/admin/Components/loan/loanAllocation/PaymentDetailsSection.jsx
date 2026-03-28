import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PaymentDetailModal from '../PaymentDetailModal';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useInertiaForm from '@/hooks/loan/loanAllocation/loanPaymentForm/useInertiaForm';

const PaymentDetailsSection = ({
    loanPayment,
    previousPayments,
    formState,
    installmentPeriods,
    paymentModes,
    fiscalYears,
    errors
}) => {
    const [paymentDetails, setPaymentDetails] = useState(previousPayments);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [editingPaymentDetail, setEditingPaymentDetail] = useState(null);



    const { handleSubmit, handleDeletePaymentDetail, processing } = useInertiaForm(paymentDetails, setPaymentDetails); // Call custom hook


    const handleOpenPaymentModal = () => {
        setIsPaymentModalOpen(true);
        setEditingPaymentDetail(null);
    };

    const handleClosePaymentModal = () => {
        setIsPaymentModalOpen(false);
        setEditingPaymentDetail(null);
    };
    const handleSavePaymentDetail = (detail) => {
        handleSubmit(detail);
    };



    const handleEditPaymentDetail = (detail) => {
        // #call edit
        setEditingPaymentDetail(detail);
        setIsPaymentModalOpen(true);
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
            field: 'payment_source_id',
            headerName: 'भुक्तानी माध्यम',
            flex: 1,
            valueGetter: (params) => {
                const paymentSource = paymentModes.find(source => source.id == params);
                return paymentSource ? paymentSource.name_np : 'Unknown';
            }
        },
        { field: 'receipt_no', headerName: 'चेक /भौचर नं ', width: 120 },
        {
            field: 'installment_id',
            headerName: 'किस्ता',
            flex: 1,
            valueGetter: (params) => {
                const installment = installmentPeriods.find(source => source.id == params);
                return installment ? installment.name_np : 'Unknown';
            }
        },
        { field: 'installment_amount', headerName: 'रकम', width: 150 },
        { field: 'loan_description', headerName: 'ऋणको विवरण', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
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
                        onClick={() => handleDeletePaymentDetail(params.row.id)}
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
                        भुक्तानी बिवरण
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
                rows={paymentDetails}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                disableSelectionOnClick
            />

            <PaymentDetailModal
                formState={formState}
                open={isPaymentModalOpen}
                onClose={handleClosePaymentModal}
                onSave={handleSavePaymentDetail}
                detail={editingPaymentDetail}
                installmentPeriods={installmentPeriods}
                paymentModes={paymentModes}
                fiscalYears={fiscalYears}
                editingPaymentDetail={editingPaymentDetail}
                setPaymentDetails={setPaymentDetails}
                handleSubmit={handleSubmit}
                loanPayment={loanPayment}
            />
        </Grid>
    );
};

export default PaymentDetailsSection;
