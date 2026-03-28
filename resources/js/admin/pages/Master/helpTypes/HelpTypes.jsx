import React from 'react'
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import DataTable from '@/admin/Components/dataTable/DataTable';
import { HelpTypesColumns } from "@/forms/master";

const HelpTypes = ({ auth, helpTypes }) => {
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <DataTable userRows={helpTypes} userColumns={HelpTypesColumns} title={"सहयोगको किसिम "} route={'help_types'} />
            </AuthenticatedLayout>
        </div>
    )
}

export default HelpTypes
