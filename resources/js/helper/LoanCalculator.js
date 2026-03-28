class LoanCalculator {
    static calculateRemainingAmount(allocatedAmount, installmentAmount) {
        return allocatedAmount - installmentAmount;
    }
}

export default LoanCalculator;
