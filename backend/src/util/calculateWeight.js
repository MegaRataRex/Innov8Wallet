function calculateWeights(year, month) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const monthsAgo = (currentYear - year) * 12 + (currentMonth - month);
  return monthsAgo <= 2 ? 1 : Math.exp(-0.15 * (monthsAgo - 1)); // Más peso al mes más reciente
}

module.exports = { calculateWeights };
