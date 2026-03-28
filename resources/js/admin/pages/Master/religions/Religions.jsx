import React from 'react'
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import DataTable from '@/admin/Components/dataTable/DataTable';
import { religionsColumns } from "@/forms/master";

const Religions = ({ auth, religions }) => {
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <DataTable userRows={religions} userColumns={religionsColumns} title={"धर्म"} route={'religions'} />
            </AuthenticatedLayout>
        </div>
    )
}

export default Religions
