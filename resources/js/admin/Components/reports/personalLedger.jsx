import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import govLogo from '../../../images/gov.png';  // Update with the correct path
import bktmunLogo from '../../../images/bktmun.png'; // Update with the correct path

const LedgerColumns = [
    { field: 'loan_distribution_date_bs', headerName: 'मिति', flex: 1.5 },
    { field: 'receipt_no', headerName: 'भौचर नम्बर', flex: 1 },
    { field: 'loan_description', headerName: 'विवरण', flex: 1 },
    { field: 'account_page_number', headerName: 'खाता पाना नं.', flex: 1 },
    { field: 'installment_amount', headerName: 'ऋण लगानी', flex: 1 },
    { field: 'total_paid_amount', headerName: 'ऋण असुली', flex: 1 },
    { field: 'total_remaining_amount', headerName: 'ऋण बाँकि', flex: 1 },
    { field: 'total_interest', headerName: 'पाउनुपर्ने ब्याज', flex: 1 },
    { field: 'total_paid_interest', headerName: 'पाएको ब्याज', flex: 1 },
    { field: 'total_remaining_interest', headerName: 'पाउन बाँकी ब्याज', flex: 1 },
    { field: 'fine_amount', headerName: 'हर्जना रकम', flex: 1 },
];

const PersonalLedger = ({ open, onClose, data }) => {
    const ledgerInfo = Array.isArray(data.personal_ledger) && data.personal_ledger.length > 0 ? data.personal_ledger[0] : null;
    const ledgerPayments = ledgerInfo ? ledgerInfo.payments : [];
    const bankLoanPayments = Array.isArray(data.bank_loan_payment) ? data.bank_loan_payment : [];

    // Merge and remove duplicates based on 'receipt_no'
    const combinedPayments = [...ledgerPayments, ...bankLoanPayments].reduce((uniquePayments, currentPayment) => {
        const isDuplicate = uniquePayments.some(payment => payment.receipt_no === currentPayment.receipt_no);
        if (!isDuplicate) {
            uniquePayments.push(currentPayment);
        }
        return uniquePayments;
    }, []);

    const sortedPayments = combinedPayments.sort((a, b) => {
        const dateA = new Date(a.loan_distribution_date_bs); // Assuming 'loan_distribution_date_bs' is in a recognizable date format
        const dateB = new Date(b.loan_distribution_date_bs);
        return dateA - dateB;
    });

    // Map rows for DataGrid
    const ledgerRows = sortedPayments.map((row, index) => ({
        id: index + 1, // Ensure unique id for each row
        ...row
    }));

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogContent>
                {/* Header Section with Logos */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 2 }}>
                    <img src={govLogo} alt="Government Logo" style={{ width: '100px', height: 'auto' }} />
                    <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
                        <h1 className="text-xl font-bold" style={{ fontFamily: 'Kalimati' }}>प्रदेश सरकार</h1>
                        <p className="text-sm" style={{ fontFamily: 'Kalimati' }}>भक्तपुर नगरपालिका</p>
                        <p className="text-sm" style={{ fontFamily: 'Kalimati' }}>बागमती प्रदेश, भक्तपुर</p>
                    </Box>
                    <img src={bktmunLogo} alt="BKT Municipality Logo" style={{ width: '100px', height: 'auto' }} />
                </Box>
                <Typography variant="h6" align="center" sx={{ marginY: 1 }}>
                    व्यक्तिगत ऋण खाता
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingY: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                        <Typography variant="body1">ऋणिको नाम: {ledgerInfo ? ledgerInfo.full_name : 'N/A'}</Typography>
                        <Typography variant="body1">ठेगाना: {ledgerInfo ? ledgerInfo.address : 'N/A'}</Typography>
                        <Typography variant="body1">सदयता नं.: {ledgerInfo ? ledgerInfo.member_id : 'N/A'}</Typography>
                        <Typography variant="body1">ऋणको उद्देश्य: {ledgerInfo ? ledgerInfo.purpose : 'N/A'}</Typography>
                        <Typography variant="body1">ब्याजदर: {ledgerInfo ? ledgerInfo.interest_rate : 'N/A'}{'%'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
                        <Typography variant="body1">ऋण स्वीकृत रकम रु: {ledgerInfo ? ledgerInfo.approved_amount : 'N/A'}</Typography>
                        <Typography variant="body1">ऋण किस्ता रकम रु: {ledgerInfo ? ledgerInfo.installment_amount : 'N/A'}</Typography>
                        <Typography variant="body1">अन्तिम भुक्तानी मिति: {ledgerInfo ? ledgerInfo.last_payment_date : 'N/A'}</Typography>
                        <Typography variant="body1">धितो जमानत: {ledgerInfo ? ledgerInfo.collateral : 'N/A'}</Typography>
                        <Typography variant="body1">सम्पर्क नं.: {ledgerInfo ? ledgerInfo.contact_number : 'N/A'}</Typography>
                    </Box>
                </Box>
                {/* Data Grid */}
                <DataGrid
                    rows={ledgerRows}
                    columns={LedgerColumns}
                    autoHeight
                    pageSizeOptions={[5, 10, 25]}
                    sx={{ width: '100%', minWidth: 600 }} // Set a minimum width for the DataGrid
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PersonalLedger;
