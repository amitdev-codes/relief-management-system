import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import DataTable from '@/admin/Components/dataTable/DataTable';
import { relief_fund_allocation_Columns } from "@/forms/application_form";

const index = ({ auth, relief_fund_allocations }) => {
    return (
        <div>
            <AuthenticatedLayout>
                <DataTable userRows={relief_fund_allocations} userColumns={relief_fund_allocation_Columns} title={"राहत विवरण"} route={'reliefFundAllocations'} />
            </AuthenticatedLayout>
        </div>
    )
}

export default index
