import React from 'react'
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import DataTable from '@/admin/Components/dataTable/DataTable';
import { GrantTypesColumns } from "@/forms/master";

const GrantTypes = ({ auth, grantTypes }) => {
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <DataTable userRows={grantTypes} userColumns={GrantTypesColumns} title={"अनुदानको प्रकार"} route={'grant_types'} />
            </AuthenticatedLayout>
        </div>
    )
}

export default GrantTypes
