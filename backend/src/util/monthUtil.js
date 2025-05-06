function getMonthDays(month) {
  if (month < 1 || month > 12) {
    throw new Error("El mes debe estar entre 1 y 12");
  }

  const daysPerMonth = {
    1: 31, // Enero
    2: 28, // Febrero (sin considerar años bisiestos)
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  return daysPerMonth[month];
}

module.exports = {
  getMonthDays,
};
