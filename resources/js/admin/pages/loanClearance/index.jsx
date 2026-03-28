import React from 'react'
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import DataTable from '@/admin/Components/loan/loanClearance/DataTable';
import { loan_clearances_Columns } from "@/forms/application_form";
import { Box } from '@mui/material';
const index = ({ auth, loan_clearances }) => {
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <DataTable userRows={loan_clearances} userColumns={loan_clearances_Columns} title={"ऋण चुक्ता विवरण"} route={'loanClearances'} Edit={true} create={false} />
            </AuthenticatedLayout>
        </div>
    )
}
export default index
