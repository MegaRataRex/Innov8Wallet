function calculateMonthlySavings(goalAmount, deadline, currentSavings, annualInflationRate = 0.03) {
    const today = new Date();
    const monthsRemaining = ((new Date(deadline)).getFullYear() - today.getFullYear()) * 12 + ((new Date(deadline)).getMonth() - today.getMonth());

    if (monthsRemaining <= 0) return { error: "La fecha límite ya pasó o es inválida." };

    const adjustedGoal = goalAmount * Math.pow(1 + annualInflationRate, monthsRemaining / 12);
    const monthlySavings = (adjustedGoal - currentSavings) / monthsRemaining;

    return { monthlySavings, adjustedGoal, monthsRemaining };
}

function calculateRetirementSavings(expectedRetirementAge, lifeExpectancy, desiredAnnualIncome, currentSavings, annualInflationRate = 0.03, investmentReturnRate = 0.05) {
    const yearsToRetirement = expectedRetirementAge - (new Date()).getFullYear();
    const retirementDuration = lifeExpectancy - expectedRetirementAge;

    if (yearsToRetirement <= 0 || retirementDuration <= 0) return { error: "Los parámetros proporcionados son inválidos." };

    const adjustedAnnualIncome = desiredAnnualIncome * Math.pow(1 + annualInflationRate, yearsToRetirement);
    const totalRetirementFund = adjustedAnnualIncome * ((1 - Math.pow(1 + investmentReturnRate, -retirementDuration)) / investmentReturnRate);
    const monthlySavings = (totalRetirementFund - currentSavings) / (yearsToRetirement * 12);

    return { monthlySavings, totalRetirementFund, yearsToRetirement };
}

function suggestAdjustments(goalAmount, currentSavings, monthlySavings, userIncome, remainingTime) {
    const affordability = userIncome * 0.2;

    if (monthlySavings > affordability) {
        return {
            suggestion: "El ahorro necesario excede tus ingresos. Considera extender el plazo o reducir el monto objetivo.",
            affordableSavings: affordability,
        };
    }
    return { suggestion: "Tu plan de ahorro es viable. Sigue así.", affordableSavings: monthlySavings };
}

module.exports = {
    calculateMonthlySavings,
    calculateRetirementSavings,
    suggestAdjustments,
};