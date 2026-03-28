
import React from 'react'
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';

import DataTable from '@/Components/Mui/DataTableComponent';
import { UserColumns } from "@/forms/user_management";

const User = ({ auth, users }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
                <DataTable
                    userRows={users}
                    userColumns={UserColumns}
                    title={"User"}
                    route={'users'}
                    formType="modal"
                />

        </AuthenticatedLayout>
    )
}

export default User;

// // For full form view
// <DataTable
//   userColumns={columns}
//   userRows={rows}
//   route="users"
//   title="Users"
//   formType="form"
// />
