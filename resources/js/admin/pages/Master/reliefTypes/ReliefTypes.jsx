import React from 'react'
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import DataTable from '@/admin/Components/dataTable/DataTable';
import { ReliefTypesColumns } from "@/forms/master";

const ReliefTypes = ({ auth, reliefTypes }) => {
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <DataTable userRows={reliefTypes} userColumns={ReliefTypesColumns} title="राहत प्रकार" route={'relief_types'} />
            </AuthenticatedLayout>
        </div>
    )
}

export default ReliefTypes
