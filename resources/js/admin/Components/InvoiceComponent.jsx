import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { IconButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/PrintOutlined';
import DescriptionIcon from '@mui/icons-material/Description';

const InvoiceComponent = ({ route }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [invoiceData, setInvoiceData] = useState([]);
    const [firstInstallmentInfo, setFirstInstallmentInfo] = useState(null);

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
    return (
        <Link href={route} className="action-link">
            <IconButton
                onClick={() => openModal('invoice', params.row.id)}
                size="small"
                color="primary">
                <DescriptionIcon fontSize="small" />
            </IconButton>
        </Link>
    );
};

export default InvoiceComponent;
