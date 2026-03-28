import React from 'react'

import DataTable from '@/admin/Components/dataTable/DataTable';
import { grant_fund_allocations_Columns } from "@/forms/application_form";
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';

const index = ({ grant_fund_allocations }) => {
    return (
        <div>
            <AuthenticatedLayout>
                <DataTable userRows={grant_fund_allocations} userColumns={grant_fund_allocations_Columns} title={"अनुदान विवरण "} route={'grantAllocations'} create={true} />
            </AuthenticatedLayout>
        </div>
    )
}

export default index
