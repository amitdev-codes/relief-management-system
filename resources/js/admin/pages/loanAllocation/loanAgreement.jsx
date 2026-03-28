import AgreementTemplate from '@/admin/Components/AgreementTemplate'
import React from 'react'

const loanAgreement = ({ loanAllocation }) => {
    return (
        <div>
            <AgreementTemplate loanAllocation={loanAllocation} />
        </div>
    )
}

export default loanAgreement
