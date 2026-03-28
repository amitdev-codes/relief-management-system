import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReactImageLightbox from 'react-image-lightbox';


import ImageCellComponent from '../admin/Components/ImageModal';
const CustomCell = styled("div")({
    fontFamily: "Kalimati, serif",
    fontSize: "14px",
    textAlign: "center",
});



export const relief_fund_allocation_Columns = [
    { field: "id", headerName: "क्र.सं.", flex: 0.2 },
    {
        field: "incident_date",
        headerName: "मिति",
        flex: 1,
        headerClassName: "headerKalimati",
        renderCell: (params) => <CustomCell>{params.value}</CustomCell>,
    },
    {
        field: "applicant_names",
        headerName: "लाभग्राहीका नामहरु",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => <CustomCell>{params.value}</CustomCell>,
    },
    {
        field: "single_package",
        headerName: "राहत बिबरण",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => <CustomCell>{params.value}</CustomCell>,
    },
    {
        field: "incident_description",
        headerName: "क्षतिको विवरण",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => <CustomCell>{params.value}</CustomCell>,
    },
    {
        field: "relief_package_name",
        headerName: "राहत प्याकेज",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => <CustomCell>{params.value}</CustomCell>,
    },
    {
        field: "file_uploads",
        headerName: "फोटो",
        flex: 1,
        headerClassName: 'headerKalimati',
        renderCell: (params) => (
            <CustomCell>
                {params.value ? (
                    <img
                        src={params.value}
                        alt="File Upload"
                        style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                    />
                ) : (
                    'No Image'
                )}
            </CustomCell>
        ),
    },
    {
        field: "remarks",
        headerName: "कैफियत",
        flex: 1,
        headerClassName: "headerKalimati",
        renderCell: (params) => <CustomCell>{params.value}</CustomCell>,
    },
];
export const grant_fund_allocations_Columns = [
    { field: "id", headerName: "क्र.सं.", width: 10 },
    {
        field: "name", headerName: "पुरा नाम ", width: 130, headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name}</CustomCell>;
        },
    },
    {
        field: "grant_asked_date", headerName: "अनुदान माग विवरण मिति", width: 200, headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.grant_asked_date}</CustomCell>;
        },
    },

    {
        field: "grant_type",
        headerName: "अनुदानको प्रकार ",
        width: 200,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.grant_type}</CustomCell>;
        },
    },
    {
        field: "grant_purpose_type",
        headerName: "अनुदानको उद्देश्य",
        width: 200,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.grant_purpose_type}</CustomCell>;
        },
    },
    {
        field: "grant_business_type",
        headerName: "अनुदानको व्यवसायको विवरण",
        width: 200,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.grant_business_type}</CustomCell>;
        },
    },
    {
        field: "grant_quantity",
        headerName: "अनुदानको परिमाण",
        width: 200,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.grant_quantity}</CustomCell>;
        },
    },
    {
        field: "grant_receipt",
        headerName: "अनुदान प्राप्ति प्रमाण",
        width: 200,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.grant_receipt}</CustomCell>;
        },
    },

    {
        field: "file_uploads",
        headerName: "अनुदान विवरण फायल अपलोड",
        width: 200,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.file_uploads}</CustomCell>;
        },
    },
    {
        field: "remarks",
        headerName: "कैफियत",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.remarks}</CustomCell>;
        },
    },
    {
        field: "status",
        headerName: "Status",
        width: 90,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return (
                <Chip
                    label={params.value ? "स्वीकृत" : "अस्वीकृत"}
                    color={params.value ? "success" : "error"}
                    className="Status"
                    size="small"
                />
            );
        },
    },

];
//loan allocation
export const loan_allocations_Columns = [
    { field: "id", headerName: "क्र.सं.", flex: 0.2 },
    {
        field: "name", flex: 1, headerName: "पुरा नाम ", headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name}</CustomCell>;
        },
    },
    {
        label: "loan_status",
        field: "loan_status",
        flex: 1.5,
        headerName: "ऋणको अवस्था ",
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            // const { color, label } = getChipColor(params.row.loan_status);
            return (<Chip
                label={label} // Use the dynamic label
                className="loan_status"
                color={color} // Use the dynamic color
                size="small"
            />
            );
        },
    },

    {
        field: "loan_purpose_type",
        headerName: "ऋणको उद्देश्य",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.loan_purpose_type}</CustomCell>;
        },
    },
    {
        field: "loan_approved_amount",
        headerName: "ऋणको रकम",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.loan_approved_amount}</CustomCell>;
        },
    },
    // {
    //     field: "loan_provided_date",
    //     headerName: "ऋण वितरण मिति",
    //     flex: 1.5,
    //     headerClassName: "headerKalimati",
    //     renderCell: (params) => {
    //         return <CustomCell>{params.row.loan_provided_date}</CustomCell>;
    //     },
    // },
    {
        field: "remaining_amount",
        headerName: "बाकि रकम",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.remaining_amount}</CustomCell>;
        },
    },
    {
        field: "loan_repayment_period",
        headerName: "ऋण फिर्ता अवधि",
        flex: 1,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.loan_repayment_period}</CustomCell>;
        },
    },
    {
        field: "interest_rate",
        headerName: "ब्याजदर",
        flex: 1,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.interest_rate}</CustomCell>;
        },
    },

];

//loan clearance
export const loan_clearances_Columns = [
    { field: "id", headerName: "क्र.सं.", flex: 0.2 },
    {
        field: "name", flex: 1, headerName: "पुरा नाम ", headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name}</CustomCell>;
        },
    },
    {
        field: "loan_status",
        flex: 1.5,
        headerName: "ऋणको अवस्था ",
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            const { color, label } = getChipColor(params.row.loan_status);
            return (<Chip
                label={label} // Use the dynamic label
                className="loan_status"
                color={color} // Use the dynamic color
                size="small"
            />
            );
        },
    },

    {
        field: "loan_purpose_type",
        headerName: "ऋणको उद्देश्य",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.loan_purpose_type}</CustomCell>;
        },
    },
    {
        field: "loan_approved_amount",
        headerName: "ऋणको रकम",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.loan_approved_amount}</CustomCell>;
        },
    },
    {
        field: "remaining_loan_clearance_amount",
        headerName: "बाकि रकम",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.remaining_loan_clearance_amount}</CustomCell>;
        },
    },
];

export const applicant_profiles_Columns = [
    {
        field: "id",
        headerName: "क्र.सं.",
        flex: 0.1,
        headerClassName: "headerKalimati"
    },
    {
        field: "name",
        headerName: "पुरा नाम",
        flex: 1,
        headerClassName: "headerKalimati",
        renderCell: (params) => <CustomCell>{params.row.name}</CustomCell>,
    },
    {
        field: "gender",
        headerName: "लिङ्ग",
        flex: 0.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => <CustomCell>{params.row.gender}</CustomCell>,
    },
    {
        field: "address",
        headerName: "ठेगना विवरण",
        flex: 2,
        headerClassName: "headerKalimati",
        renderCell: (params) => <CustomCell>{params.row.address}</CustomCell>,
    },
    {
        field: "citizenship",
        headerName: "नागरिकता विवरण",
        flex: 2,
        headerClassName: "headerKalimati",
        renderCell: (params) => <CustomCell>{params.row.citizenship}</CustomCell>,
    },
    {
        field: "mobile_number",
        headerName: "मोबाईल नं",
        flex: 1,
        headerClassName: "headerKalimati",
        renderCell: (params) => <CustomCell>{params.row.mobile_number}</CustomCell>,
    },
    // {
    //     field: "last_name_np",
    //     headerName: "जात",
    //     flex: 1,
    //     headerClassName: "headerKalimati",
    //     renderCell: (params) => <CustomCell>{params.row.last_name_np}</CustomCell>,
    // },
    {
        field: "family_count",
        headerName: "पारिवारीक संख्या",
        flex: 1,
        headerClassName: "headerKalimati",
        renderCell: (params) => <CustomCell>{params.row.family_count}</CustomCell>,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 0.7,
        headerClassName: "headerKalimati",
        renderCell: (params) => (
            <Chip
                label={params.row.status == true || params.row.status == "1" ? "सक्रिय" : "निस्क्रिय"}
                color={params.row.status == true || params.row.status == "1" ? "success" : "error"}
                className="Status"
                size="small"
            />
        ),
    },
];


