import React from 'react'
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import DataTable from '@/admin/Components/dataTable/DataTable';
import { loan_allocations_Columns } from "@/forms/application_form";

const index = ({ auth, loan_allocations }) => {
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <DataTable userRows={loan_allocations} userColumns={loan_allocations_Columns} title={"ऋणी आवेदनकर्ता"} route={'loanAllocations'} hasPrint={true} create={true} Edit={true} />
            </AuthenticatedLayout>
        </div>
    )
}

export default index
