import React from 'react'
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import { loan_purpose_report_columns } from "@/forms/reports";
import DataTable from '@/admin/Components/reports/DataTable';

const LoanPurposedReport = ({ auth, loanPurposeReport, bank_loan_payment }) => {

    return (
        <div>
            <AuthenticatedLayout>
                <DataTable userRows={loanPurposeReport} bank_loan_payment={bank_loan_payment} userColumns={loan_purpose_report_columns} title={"उद्धेस्यगत ऋणको प्रतिवेदन"} route={'loanPurposeReport'} Create={false} Edit={false} />
            </AuthenticatedLayout>
        </div>
    )
}

export default LoanPurposedReport
