import React from 'react'
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import DataTable from '@/admin/Components/dataTable/DataTable';
import { ReliefPackageColumns } from "@/forms/master";

const ReliefPackage = ({ auth, relief_packages }) => {
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <DataTable userRows={relief_packages} userColumns={ReliefPackageColumns} title={"राहत प्याकेजहरु"} route={'relief_packages'} />
            </AuthenticatedLayout>
        </div>
    )
}

export default ReliefPackage
