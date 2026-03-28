import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";



const CustomCell = styled("div")({
    fontFamily: "Kalimati, serif",
    fontSize: "14px",
    textAlign: "center",
});
//relief prioritization columns
export const UserColumns = [
    { field: "id", headerName: "ID", width: 70 },
    // {
    //     field: "palika_id",
    //     headerName: "पालिका",
    //     width: 70,
    //     headerClassName: "headerKalimati ",
    //     renderCell: (params) => {
    //         return <CustomCell>{params.row.palika_id}</CustomCell>;
    //     },
    // },
    {
        field: "name",
        headerName: "Name",
        width: 150,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name}</CustomCell>;
        },
    },
    {
        field: "name_np",
        headerName: "नाम",
        width: 150,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name_np}</CustomCell>;
        },
    },
    {
        field: "email",
        headerName: "इमेल",
        width: 200,
        headerClassName: "headerKalimati",
        renderCell: (params) => (
            <CustomCell>{params.row.email}</CustomCell>
        ),
    },
    {
        field: "mobile_number",
        headerName: " मोबाईल नं ",
        width: 200,
        headerClassName: "headerKalimati",
        renderCell: (params) => (
            <CustomCell>{params.row.mobile_number}</CustomCell>
        ),
    },
    {
        field: "status",
        headerName: "Status",
        width: 90,
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
export const RoleColumns = [
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
        width: 100,
        headerClassName: "headerKalimati",
        renderCell: (params) => {
            return <CustomCell>{params.row.name_np}</CustomCell>;
        },
    },
];

