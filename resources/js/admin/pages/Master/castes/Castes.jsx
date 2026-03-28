import React from 'react'
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import DataTable from '@/admin/Components/dataTable/DataTable';
import { castesColumns } from "@/forms/master";

const Castes = ({ auth, castes }) => {
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <DataTable userRows={castes} userColumns={castesColumns} title={"जातहरु"} route={'castes'} />
            </AuthenticatedLayout>
        </div>
    )
}

export default Castes
