import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";



const CustomCell = styled("div")({
    fontFamily: "Kalimati, serif",
    fontSize: "14px",
    textAlign: "center",
});
//relief prioritization columns
export const ReliefPrioritizationColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "palika_id",
        headerName: "पालिका",
        width: 70,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.palika_id}</CustomCell>;
        },
    },
    {
        field: "name",
        headerName: "Name",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name}</CustomCell>;
        },
    },
    {
        field: "name_np",
        headerName: "नाम",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name_np}</CustomCell>;
        },
    },
    {
        field: "description",
        headerName: "कैफियत",
        width: 230,
        headerClassName: "headerKalimati",
        renderCell: (params) => (
            <CustomCell>{params.row.description}</CustomCell>
        ),
    },
    {
        field: "status",
        headerName: "Status",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return (
                <Chip
                    label={params.value ? "Active" : "Inactive"}
                    color={params.value ? "success" : "error"}
                    className="Status"
                    size="small"
                />
            );
        },
    },
];
//relief types
export const ReliefTypesColumns = [
    { field: "id", headerName: "ID", width: 70 },
    // {
    //     field: "palika_id",
    //     headerName: "पालिका",
    //     width: 230,
    //     headerClassName: "headerKalimati",
    //     renderCell: (params) => {
    //         return <CustomCell>{params.row.palika_id}</CustomCell>;
    //     },
    // },
    {
        field: "name",
        headerName: "Name",
        width: 230,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name}</CustomCell>;
        },
    },
    // {
    //     field: "name_np",
    //     headerName: "नाम",
    //     width: 100,
    //     headerClassName: "headerKalimati",
    //     renderCell: (params) => {
    //         return <CustomCell>{params.row.name_np}</CustomCell>;
    //     },
    // },
    {
        field: "description",
        headerName: "कैफियत",
        width: 300,
        headerClassName: "headerKalimati",
        renderCell: (params) => (
            <CustomCell>{params.row.description}</CustomCell>
        ),
    },
    {
        field: "status",
        headerName: "Status",
        width: 160,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return (
                <Chip
                    label="active"
                    color="success"
                    className="Status"
                    size="small"
                />
            );
        },
    },
];
//help types
export const HelpTypesColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "palika_id",
        headerName: "पालिका",
        width: 230,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name}</CustomCell>;
        },
    },
    {
        field: "name",
        headerName: "Name",
        width: 230,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name}</CustomCell>;
        },
    },
    {
        field: "name_np",
        headerName: "नाम",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name_np}</CustomCell>;
        },
    },
    {
        field: "description",
        headerName: "कैफियत",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => (
            <CustomCell>{params.row.description}</CustomCell>
        ),
    },
    {
        field: "status",
        headerName: "Status",
        width: 160,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return (
                <Chip
                    label="active"
                    color="success"
                    className="Status"
                    size="small"
                />
            );
        },
    },
];
//grant types
export const GrantTypesColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "palika_id",
        headerName: "पालिका",
        width: 230,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.palika_id}</CustomCell>;
        },
    },
    {
        field: "name",
        headerName: "Name",
        width: 230,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name}</CustomCell>;
        },
    },

    {
        field: "name_np",
        headerName: "नाम",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name_np}</CustomCell>;
        },
    },
    {
        field: "description",
        headerName: "कैफियत",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => (
            <CustomCell>{params.row.description}</CustomCell>
        ),
    },
    {
        field: "status",
        headerName: "Status",
        width: 160,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return (
                <Chip
                    label="active"
                    color="success"
                    className="Status"
                    size="small"
                />
            );
        },
    },
];
//religions types
export const religionsColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "name",
        headerName: "Name",
        width: 230,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name}</CustomCell>;
        },
    },
    {
        field: "name_np",
        headerName: "नाम",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name_np}</CustomCell>;
        },
    },
];
//castes types
export const castesColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "name",
        headerName: "Name",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name}</CustomCell>;
        },
    },
    {
        field: "name_np",
        headerName: "नाम",
        type: "text",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name_np}</CustomCell>;
        },
    },
];
//loan types
export const LoanTypesColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "palika_id",
        headerName: "पालिका",
        width: 230,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.palika_id}</CustomCell>;
        },
    },
    {
        field: "name",
        headerName: "Name",
        width: 230,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name}</CustomCell>;
        },
    },

    {
        field: "name_np",
        headerName: "नाम",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name_np}</CustomCell>;
        },
    },
    {
        field: "description",
        headerName: "कैफियत",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => (
            <CustomCell>{params.row.description}</CustomCell>
        ),
    },
    {
        field: "status",
        headerName: "Status",
        width: 160,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return (
                <Chip
                    label="active"
                    color="success"
                    className="Status"
                    size="small"
                />
            );
        },
    },
];
//loan purpose types
export const LoanPurposeTypesColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "palika_id",
        headerName: "पालिका",
        width: 230,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.palika_id}</CustomCell>;
        },
    },
    {
        field: "name",
        headerName: "Name",
        width: 230,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name}</CustomCell>;
        },
    },

    {
        field: "name_np",
        headerName: "नाम",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name_np}</CustomCell>;
        },
    },
    {
        field: "description",
        headerName: "कैफियत",
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => (
            <CustomCell>{params.row.description}</CustomCell>
        ),
    },
    {
        field: "status",
        headerName: "Status",
        width: 160,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return (
                <Chip
                    label="active"
                    color="success"
                    className="Status"
                    size="small"
                />
            );
        },
    },
];
//relief package columns

export const ReliefPackageColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "title",
        headerName: "Package Name",
        width: 200,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.value}</CustomCell>;
        },
    },
    {
        field: "relief_package",
        headerName: "प्याकेज सामानहरु ",
        type: "text",
        width: 300,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.value}</CustomCell>;
        },
    },
];
//educational loan faculties form
export const educational_loan_faculties_Columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "code", headerName: "Code", width: 70 },
    {
        field: "eduLoanFaculty",
        flex: 1,
        headerName: "शैक्षिक संकाय",
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.eduLoanFaculty}</CustomCell>;
        },
    },

    {
        field: "educationalLevel",
        headerName: "शैक्षिक तह",
        flex: 1,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.educationalLevel}</CustomCell>;
        },
    },
    {
        field: "loan_amount",
        headerName: "कैफियत",
        flex: 1,
        headerClassName: "headerKalimati",
        renderCell: (params) => (
            <CustomCell>{params.row.description}</CustomCell>
        ),
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        headerClassName: "headerKalimati"
    },
];
