const db = require("../config/db");

//prepara los datos para su uso en ../models/spendingModel.js
async function prepareData(userId, category, paymentId) {
  //añade sufijos a los querys para no tener que hacer un chingo de condiciones
  try {
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

    //yo preguntándole cosas a la db.
    let queryString = `
      SELECT * FROM transactions 
      WHERE user_id = ? 
      AND MONTH(date) = MONTH(CURDATE()) 
      AND YEAR(date) = YEAR(CURDATE()) 
      ${stringSuffix}`;

    const monthSpendings = await db.query(queryString, params);

    queryString = `
      SELECT SUM(amount) AS total_spent 
      FROM transactions 
      WHERE user_id = ? 
      AND MONTH(date) = MONTH(CURDATE()) 
      AND YEAR(date) = YEAR(CURDATE()) 
      ${stringSuffix}`;

    const [monthlySpent] = await db.query(queryString, params);

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
    const currentSpending = monthlySpent?.total_spent || 0;
    const savingsRate = income
      ? ((income - currentSpending) / income) * 100
      : 0;

    queryString = `
      SELECT SUM(amount) AS weekend_spent 
      FROM transactions 
      WHERE user_id = ? 
      AND WEEKDAY(date) IN (5,6) 
      AND MONTH(date) = MONTH(CURDATE()) 
      AND YEAR(date) = YEAR(CURDATE()) 
      ${stringSuffix}`;

    //lo mismo que lo anterior, sólo que revisa qué porcentaje del dinero se va en los fines de semana
    const [weekendSpentData] = await db.query(queryString, params);
    const weekendSpending = weekendSpentData?.weekend_spent || 0;
    const weekendSpendingRatio = currentSpending
      ? (weekendSpending / currentSpending) * 100
      : 0;

    //retorna todos los datos recopilados en un JSON.
    return {
      monthSpendings: monthSpendings,
      currentMonthSpending: currentSpending,
      previousMonthSpending: previousMonthSpent?.total_spent || 0,
      income: income,
      savingsRate: savingsRate,
      weekendSpendingRatio: weekendSpending,
    };
  } catch (err) {
    console.error("Error al obtener los datos:", err);
    throw err;
  }
}
