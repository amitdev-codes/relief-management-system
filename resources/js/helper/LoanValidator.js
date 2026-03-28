class LoanValidator {
    static validateInstallment(
        allocatedAmount,
        installmentAmount,
        existingInstallments
    ) {
        const totalInstallmentAmount = existingInstallments.reduce(
            (sum, installment) => sum + installment,
            0
        );
        const newTotal = totalInstallmentAmount + installmentAmount;

        if (installmentAmount > allocatedAmount) {
            return {
                valid: false,
                message: "Installment amount cannot exceed allocated amount.",
            };
        }

        if (newTotal > allocatedAmount) {
            return {
                valid: false,
                message:
                    "Total installment amount cannot exceed allocated amount.",
            };
        }

        return { valid: true };
    }
}

export default LoanValidator;
