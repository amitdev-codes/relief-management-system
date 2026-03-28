import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomCell = styled("div")({
    fontFamily: "Kalimati, serif",
    fontSize: "14px",
    textAlign: "center",
});

//loan allocation
export const loan_purpose_report_columns = [
    { field: "id", headerName: "क्र.सं.", flex: 0.2 },
    {
        field: "full_name", flex: 1, headerName: "ऋणीको नाम", headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.full_name}</CustomCell>;
        },
    },
    {
        field: "purpose",
        headerName: "ऋणको उद्धेश्य ",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.purpose}</CustomCell>;
        },
    },
    {
        field: "faculty_name_np",
        headerName: "शैक्षिक संकाय",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.faculty_name_np}</CustomCell>;
        },
    },
    {
        field: "previous_year_loan_amount",
        headerName: "गत बर्षको ऋण",
        flex: 0.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.previous_year_loan_amount}</CustomCell>;
        },
    },
    {
        field: "current_year_loan_amount",
        headerName: "चालु बर्षको ऋण ",
        flex: 0.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.current_year_loan_amount}</CustomCell>;
        },
    },
    {
        field: "total_interest",
        headerName: "ब्याज",
        flex: 0.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.total_interest}</CustomCell>;
        },
    },
    {
        field: "remaining_current_year_loan_amount",
        headerName: "कुल बाकी ",
        flex: 1,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.remaining_current_year_loan_amount}</CustomCell>;
        },
    },

];
//personal ledger
export const loan_personal_ledger_columns = [
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
        field: "loan_allocated_amount",
        headerName: "ऋणको रकम",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.loan_allocated_amount}</CustomCell>;
        },
    },
    {
        field: "loan_provided_date",
        headerName: "ऋण वितरण मिति",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.loan_provided_date}</CustomCell>;
        },
    },
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
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.loan_repayment_period}</CustomCell>;
        },
    },
    {
        field: "interest_rate",
        headerName: "ब्याजदर",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.interest_rate}</CustomCell>;
        },
    },
    {
        field: "file_uploads",
        headerName: "ऋण विवरण फायल अपलोड",
        flex: 1.5,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.file_uploads}</CustomCell>;
        },
    },



];
