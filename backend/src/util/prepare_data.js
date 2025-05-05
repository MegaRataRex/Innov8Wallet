const db = require("../config/db");
const { isHoliday } = require("./holidayAPI");

//prepara los datos para su uso en ../models/spendingModel.js
<<<<<<< HEAD
function prepareDataMonth(userId, category, paymentId) {
  return new Promise((resolve, reject) => {
=======
async function prepareDataMonth(userId, category, paymentId, callback) {
  //añade sufijos a los querys para no tener que hacer un chingo de condiciones
  try {
>>>>>>> d3407bcf53021f4ab95be4cf478af8d0a92e1f41
    let stringSuffix = "";
    let params = [userId];

    if (paymentId) {
      stringSuffix += ` AND payment_method_id = ?`;
      params.push(paymentId);
    }
    if (category) {
      stringSuffix += ` AND category = ?`;
      params.push(category);
    }

<<<<<<< HEAD
    const queryString = `
      SELECT 
        YEAR(date) AS year,
        MONTH(date) AS month,
        DAY(date) AS day,
        WEEKDAY(date) AS weekday,
        CASE WHEN WEEKDAY(date) IN (5,6) THEN 1 ELSE 0 END AS is_weekend,
        SUM(amount) AS total_spent
      FROM transactions 
      WHERE user_id = ? 
      ${stringSuffix} 
      GROUP BY YEAR(date), MONTH(date), DAY(date), WEEKDAY(date)
      ORDER BY date DESC`;

    db.query(queryString, params, (err, results) => {
      if (err) return reject(err);

      const sortedData = results.sort(
        (a, b) => parseFloat(a.total_spent) - parseFloat(b.total_spent)
      );
      const total = sortedData.length;
      const lowerIndex = Math.floor(total * 0.05);
      const upperIndex = Math.ceil(total * 0.95);
      const filteredData = sortedData.slice(lowerIndex, upperIndex);

      resolve(filteredData); // Devolvemos directamente el array
    });
  });
=======
    queryString = `
    SELECT 
      YEAR(date) AS year,
      MONTH(date) AS month,
      DAY(date) AS day,
      WEEKDAY(date) AS weekday,
      CASE WHEN WEEKDAY(date) IN (5,6) THEN 1 ELSE 0 END AS is_weekend,
      SUM(amount) AS total_spent
    FROM transactions 
    WHERE user_id = ? 
    ${stringSuffix} 
    GROUP BY YEAR(date), MONTH(date), DAY(date), WEEKDAY(date)
    ORDER BY date DESC`;
    db.query(queryString, params, (err, results) => {
      if (err) throw err;
      const sortedData = results.sort((a, b) => a.total_spent - b.total_spent);
      const total = sortedData.length;
      const lowerIndex = Math.floor(total * 0.05); // 5% más bajo
      const upperIndex = Math.ceil(total * 0.95);

      const filteredData = sortedData.slice(lowerIndex, upperIndex);
      return {
        monthSpendings: filteredData,
      };
    });

    //retorna todos los datos recopilados
  } catch (err) {
    console.error("Error al obtener los datos:", err);
    throw err;
  }
>>>>>>> d3407bcf53021f4ab95be4cf478af8d0a92e1f41
}

module.exports = {
  prepareDataMonth,
};

/*
async function getDailyFinancialData(date, userId) {
  try {
    const formattedDate = new Date(date).toISOString().split("T")[0];

    const isWeekend = [0, 6].includes(new Date(date).getDay());

    const isHolidayToday = await isHoliday(date, "MX");

    let queryString = `
      SELECT COALESCE(SUM(amount), 0) AS spent 
      FROM transactions 
      WHERE user_id = ? AND DATE(date) = ?`;
    const [spentData] = await db.query(queryString, [userId, formattedDate]);

    queryString = `
      SELECT COALESCE(SUM(amount), 0) AS income 
      FROM transactions 
      WHERE user_id = ? AND DATE(date) = ? AND amount > 0`;
    const [incomeData] = await db.query(queryString, [userId, formattedDate]);

    const spent = spentData?.spent || 0;
    const income = incomeData?.income || 0;

    const savingsRate = income > 0 ? ((income - spent) / income) * 100 : 0;

    return {
      daySpendings: savingsRate,
      spent,
      isWeekend,
      isHolidayToday,
    };
  } catch (err) {
    console.error("Error fetching daily financial data:", err);
    throw err;
  }
}

module.exports = prepareDataMonth;
*/

/*//QUERIES ELIMINADAS:
    let queryString = `
      SELECT * FROM transactions 
      WHERE user_id = ? 
      AND MONTH(date) = MONTH(CURDATE()) 
      AND YEAR(date) = YEAR(CURDATE()) 
      AND amount >= $250.00 
      ${stringSuffix}`;

    const [monthSpendings] = await db.query(queryString, params);

    queryString = `
      SELECT SUM(amount) AS total_spent 
      FROM transactions 
      WHERE user_id = ? 
      AND MONTH(date) = MONTH(CURDATE()) 
      AND YEAR(date) = YEAR(CURDATE()) 
      ${stringSuffix}`;

    const monthlySpent = await db.query(queryString, params);

    queryString = `
      SELECT SUM(amount) AS total_spent 
      FROM transactions 
      WHERE user_id = ? 
      AND MONTH(date) = MONTH(CURDATE() - INTERVAL 1 MONTH) 
      AND YEAR(date) = YEAR(CURDATE() - INTERVAL 1 MONTH) 
      ${stringSuffix}`;

    const [previousMonthSpent] = await db.query(queryString, params);

    queryString = `
      SELECT SUM(amount) AS income 
      FROM transactions 
      WHERE user_id = ? 
      AND MONTH(date) = MONTH(CURDATE() - INTERVAL 1 MONTH) 
      AND YEAR(date) = YEAR(CURDATE() - INTERVAL 1 MONTH) 
      ${stringSuffix}`;

    //obtiene estadísticas adicionales, las cuales se guardan temporalmente en el backend, sólo con el propósito de proporcionar datos.
    const [incomeData] = await db.query(queryString, params);

    // revisa si el query retorna algo
    const income = incomeData?.income || 0;
    const savingsRate = income
      ? ((income - currentSpending) / income) * 100
      : 0;

    queryString = `
      SELECT SUM(amount) AS weekend_spent 
      FROM transactions 
      WHERE user_id = ? 
      AND WEEKDAY(date) IN (5,6) 
      AND MONTH(date) = MONTH(CURDATE() - INTERVAL 1 MONTH) 
      AND YEAR(date) = YEAR(CURDATE() - INTERVAL 1 MONTH) 
      ${stringSuffix}`;

    //lo mismo que lo anterior, sólo que revisa qué porcentaje del dinero se va en los fines de semana
    const [weekendSpentData] = await db.query(queryString, params);
    const weekendSpending = weekendSpentData?.weekend_spent || 0;
    const weekendSpendingRatio = currentSpending
      ? (weekendSpending / currentSpending) * 100
      : 0;

    const previousMonthSpending = previousMonthSpent?.total_spent || 0
*/
module.exports = {
  prepareDataMonth,
};
