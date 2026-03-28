import React, { useState, useRef } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from '@inertiajs/react';
import { IconButton, Box, Card, CardHeader, CardContent, Typography, Button, useTheme, Tooltip, Chip, useMediaQuery } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Modal from '@mui/material/Modal';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../../../../../public/fonts/kalimati-normal';
import Bijak from './Bijak';
import EditComponent from '@/Components/Mui/EditComponent';
import DeleteComponent from '@/Components/Mui/DeleteComponent';
import CreateComponent from '@/Components/Mui/CreateComponent';

const LoanStatusEnum = {
    CURRENT: 'CURRENT',
    OVERDUE: 'OVERDUE',
    COMPLETED: 'COMPLETED',
    PARTIALLY: 'PARTIALLY',
};

const LoanStatusLabels = {
    [LoanStatusEnum.CURRENT]: {
        label: "सक्रिय",
        color: "error",
    },
    [LoanStatusEnum.OVERDUE]: {
        label: "निस्क्रिय",
        color: "error",
    },
    [LoanStatusEnum.COMPLETED]: {
        label: "पूर्ण चुक्ता ",
        color: "success",
    },
    [LoanStatusEnum.PARTIALLY]: {
        label: "आंशिक चुक्ता",
        color: "lime",
    },
};


const DataTable = (props) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [modalContent, setModalContent] = useState(null);
    const [invoiceData, setInvoiceData] = useState([]);
    const [firstInstallmentInfo, setFirstInstallmentInfo] = useState(null);


    const openModal = async (content, rowId) => {
        if (content === 'invoice') {
            try {
                // Fetch invoice data from the controller
                const response = await fetch(`/api/loan-payments/${rowId}`);
                const data = await response.json();
                setInvoiceData(data.payments);
                setFirstInstallmentInfo(data.firstInstallment);
                setModalContent(content);
            } catch (error) {
                console.error('Error fetching invoice data:', error);
            }
        } else {
            setModalContent(content);
        }
    };

    const closeModal = () => {
        setModalContent(null);
        setInvoiceData([]);
    };

    const handlePrint = () => {
        window.print();
    };

    const invoiceColumns = [
        { field: 'loan_distribution_date_bs', headerName: 'ऋण उपलब्ध मिति', width: 150 },
        { field: 'installment_amount', headerName: 'साँवा', width: 150 },
        { field: 'interest_rate', headerName: 'ब्याज', width: 120 },
        { field: 'yearly_interest_amount', headerName: 'बार्षिक ब्याज', width: 120 },
        { field: 'monthly_interest_amount', headerName: 'प्रति महिना ब्याज', width: 120 },
        { field: 'daily_interest_amount', headerName: 'प्रति दिन ब्याज', width: 120 },
        { field: 'year', headerName: 'वर्ष', width: 120 },
        { field: 'month', headerName: 'महिना', width: 120 },
        { field: 'day', headerName: 'दिन', width: 120 },
        { field: 'total_interest_amount', headerName: 'लिनुपर्ने ब्याज', width: 150 },
    ];

    const columns = [
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Box Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Print">
                        <IconButton onClick={handlePrint} size="small" color="default">
                            <PrintIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Invoice">
                        <IconButton onClick={() => openModal('invoice', params.row.id)} size="small" color="success">
                            <DescriptionIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <EditComponent route={route(`${props.route}.edit`, params.row.id)} />
                    <DeleteComponent route={route(`${props.route}.destroy`, params.row.id)} />
                </Box>

            ),
        },
        // ...props.userColumns,
        ...props.userColumns.map((column) => ({
            ...column,
            flex: 1,
            minWidth: 150,
            renderCell: (params) => {
                if (column.field === "loan_status") {
                    const loanStatus = params.row.loan_status.toUpperCase();  // Get the loan status from the row
                    const statusInfo = LoanStatusLabels[loanStatus]; // Access the corresponding label and color
                    return (
                        <Tooltip title={params.label} enterDelay={500} leaveDelay={200}>
                            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: '1.2em', width: '100%' }}>
                                <Chip
                                    label={statusInfo.label} // Use the label from the statusInfo
                                    color={statusInfo.color} // Use the color from the statusInfo
                                    className="Status"
                                    size="small"
                                />
                            </div>
                        </Tooltip>
                    );
                }
            },
        })),
    ];


    return (
        <Box className="data-table-container">
            <Card>
                {props.create && (<CreateComponent title={props.title} route={`${props.route}.create`} />)}

                <CardContent>
                    <DataGrid
                        rows={props.userRows}
                        columns={columns}
                        autoHeight
                        getRowHeight={() => 'auto'}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: isXs ? 5 : isXl ? 25 : 10 }
                            },
                        }}
                        slots={{
                            toolbar: isXs ? null : GridToolbar,
                        }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            },
                        }}
                        pageSizeOptions={isXs ? [5, 10] : isXl ? [10, 25, 50, 100] : [5, 10, 25, 50]}
                        checkboxSelection={!isXs}
                        disableRowSelectionOnClick
                        disableColumnMenu={isXs}
                        disableColumnFilter={isXs}
                        disableColumnSelector={isXs}
                        disableDensitySelector={isXs}
                        className={`data-grid ${isXs ? 'xs' : isSm ? 'sm' : isMd ? 'md' : isLg ? 'lg' : 'xl'}`}
                    />

                </CardContent>
            </Card>
            <Modal
                open={Boolean(modalContent)}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxWidth: 1000,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,

                }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        {modalContent === 'invoice' ? 'Invoice' : 'Receipt'}
                    </Typography>
                    {modalContent === 'invoice' && (
                        <Box sx={{ height: 400, width: '100%' }} >
                            <DataGrid
                                rows={invoiceData}
                                columns={invoiceColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                            />
                            {firstInstallmentInfo && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1">
                                        पहिलो किस्ता भुक्तानी गर्ने मिति : {firstInstallmentInfo.dueDate}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        पहिलो किस्ता रकम ब्याज सहित : {firstInstallmentInfo.amount}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2,
                        mt: 3  // Add margin to push buttons down
                    }}>
                        <Button onClick={handlePrint}>Print</Button>
                        <Bijak
                            invoiceData={invoiceData}
                            invoiceColumns={invoiceColumns}
                            firstInstallmentInfo={firstInstallmentInfo}
                        />
                        <Button onClick={closeModal}>Close</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default DataTable
