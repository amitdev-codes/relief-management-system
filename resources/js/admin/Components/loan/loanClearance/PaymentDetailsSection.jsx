import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LoanPaymentModal from './LoanPaymentModal';

const PaymentDetailsSection = ({
    loanClearance,
    previousPayments,
    formState,
    handleChange,
    handleDateChange,
    installmentPeriods,
    paymentModes,
    fiscalYears,
    current_fiscal_year_id,
    errors,
    onPaymentDetailsChange,
}) => {
    const [paymentDetails, setPaymentDetails] = useState(previousPayments || []);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [editingPaymentDetail, setEditingPaymentDetail] = useState(null);

    const existingInstallments = paymentDetails.map(detail => parseFloat(detail.installment_amount) || 0);

    useEffect(() => {
        setPaymentDetails(previousPayments);
    }, [previousPayments]);

    const handleOpenPaymentModal = () => {
        setIsPaymentModalOpen(true);
        setEditingPaymentDetail(null);
    };

    const handleClosePaymentModal = () => {
        setIsPaymentModalOpen(false);
        setEditingPaymentDetail(null);
    };

    const handleSavePaymentDetail = (detail) => {
        let updatedDetails;
        if (editingPaymentDetail) {
            updatedDetails = paymentDetails.map(d => d.id === editingPaymentDetail.id ? { ...detail, id: d.id } : d);
        } else {
            // const newDetail = { ...detail, id: Date.now() };
            // updatedDetails = [...paymentDetails, newDetail];

            const newDetail = { ...detail, id: paymentDetails.length + 1 }; // Use the counter for the new ID
            updatedDetails = [...paymentDetails, newDetail];
        }

        setPaymentDetails(updatedDetails);
        onPaymentDetailsChange(updatedDetails); // Update parent state with the latest details
        handleClosePaymentModal();
    };

    const handleEditPaymentDetail = (detail) => {
        setEditingPaymentDetail(detail);
        setIsPaymentModalOpen(true);
    };

    const handleDeletePaymentDetail = (id) => {
        setPaymentDetails(paymentDetails.filter(d => d.id !== id));
    };

    const columns = [
        {
            field: 'installment_actual_date_bs',
            headerName: 'किस्ता रकम बुझाउने मिति',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'installment_actual_date_bs',
            headerName: 'किस्ता रकम बुझाएको मिति ',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'payment_source_id',
            headerName: 'भुक्तानी माध्यम',
            flex: 1,
            minWidth: 120,
            valueGetter: (params) => {
                const paymentSource = paymentModes.find(source => source.id === params);
                return paymentSource ? `${paymentSource.name_np}` : 'Unknown';
            },
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'receipt_no',
            headerName: 'चेक /भौचर नं ',
            flex: 1,
            minWidth: 120,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'installment_id',
            headerName: 'किस्ता',
            flex: 1,
            minWidth: 100,
            valueGetter: (params) => {
                const installment = installmentPeriods.find(source => source.id === params);
                return installment ? `${installment.name_np}` : 'Unknown';
            },
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'installment_amount',
            headerName: 'साँवा ',
            flex: 0.5,
            minWidth: 100,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'total_paid_interest',
            headerName: 'तिरेको ब्याज',
            flex: 1,
            minWidth: 120,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'total_amount_to_pay',
            headerName: 'कुल किस्ता रकम ',
            flex: 1,
            minWidth: 130,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'total_paid_amount',
            headerName: 'तिरेको रकम',
            flex: 1,
            minWidth: 120,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'total_remaining_amount',
            headerName: 'बाकी रकम ',
            flex: 1,
            minWidth: 120,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 180,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEditPaymentDetail(params.row)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeletePaymentDetail(params.row.id)}
                    >
                        Delete
                    </Button>
                </Box>
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

            <Box sx={{ width: '100%', overflow: 'auto' }}>
                <DataGrid
                    rows={paymentDetails}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    autoHeight
                    disableSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-cell': {
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                        },
                        '& .MuiDataGrid-columnHeader': {
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                        },
                    }}
                    columnBuffer={columns.length}
                />
            </Box>

            <LoanPaymentModal
                formState={formState}
                open={isPaymentModalOpen}
                onClose={handleClosePaymentModal}
                onSave={handleSavePaymentDetail}
                detail={editingPaymentDetail}
                installmentPeriods={installmentPeriods}
                paymentModes={paymentModes}
                userId={loanClearance.user_id}
                fiscalYears={fiscalYears}
                current_fiscal_year_id={current_fiscal_year_id}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                allocatedAmount={formState.remaining_loan_clearance_amount}
                existingInstallments={existingInstallments}
            />
        </Grid>
    );
};

export default PaymentDetailsSection;
