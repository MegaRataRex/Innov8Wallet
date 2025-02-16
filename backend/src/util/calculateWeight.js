export function calculateWeights(year, month) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const monthsAgo = (currentYear - year) * 12 + (currentMonth - month);
  return monthsAgo === 0 ? 1.5 : 1 / (monthsAgo + 1); // Más peso al mes más reciente
}

// Aplicar pesos a los datos de entrada
data.forEach((entry) => {
  entry.weight = calculateWeights(entry.year, entry.month);
});
