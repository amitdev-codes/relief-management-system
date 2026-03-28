import React from 'react'
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import DataTable from '@/admin/Components/dataTable/DataTable';
import { RoleColumns } from "@/forms/user_management";

const Roles = ({ roles }) => {
    return (
        <div>
            <AuthenticatedLayout>
                <DataTable userRows={roles} userColumns={RoleColumns} title={"Roles"} route={'roles'} create={true} />
            </AuthenticatedLayout>
        </div>
    )
}

export default Roles
