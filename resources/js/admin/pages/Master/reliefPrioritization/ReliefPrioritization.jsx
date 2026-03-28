import React from 'react'
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import DataTable from '@/admin/Components/dataTable/DataTable';
import { ReliefPrioritizationColumns } from "@/forms/master";

const ReliefPrioritization = ({ auth, reliefPrioritizations }) => {
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <DataTable userRows={reliefPrioritizations} userColumns={ReliefPrioritizationColumns} title="राहत वितरणको लागि प्राथमिकता" route={'relief_prioritizations'} />
            </AuthenticatedLayout>
        </div>
    )
}

export default ReliefPrioritization
