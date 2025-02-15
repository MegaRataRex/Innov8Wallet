const db = require("../config/db");
const { isHoliday } = require("./holidayAPI");

//prepara los datos para su uso en ../models/spendingModel.js
async function prepareDataMonth(userId, category, paymentId) {
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
      AND amount >= $250.00 
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

    const previousMonthSpending = previousMonthSpent?.total_spent || 0;

    //obtiene gastos hormiga de la semana.
    const [weeklyExpenses] = await getWeeklyExpenses(
      userId,
      paymentId,
      category
    );

    //retorna todos los datos recopilados
    return {
      monthSpendings: monthSpendings,
      weeklyExpenses,
      currentSpending,
      previousMonthSpending,
      income,
      savingsRate,
      weekendSpending,
    };
  } catch (err) {
    console.error("Error al obtener los datos:", err);
    throw err;
  }
}

async function getWeeklyExpenses(userId, paymentId, category) {
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

    // Agrupar gastos menores a 250 por semana
    const queryString = `
          SELECT YEAR(date) AS year, WEEK(date) AS week, SUM(amount) AS total_spent
          FROM transactions
          WHERE user_id = ? 
          AND amount < 250.00 
          AND MONTH(date) = MONTH(CURDATE()) 
          AND YEAR(date) = YEAR(CURDATE())
          ${stringSuffix}
          GROUP BY year, week
          ORDER BY year DESC, week DESC;
        `;

    return await db.query(queryString, params);
  } catch (err) {
    console.error("Error al obtener los gastos pequeños por semana:", err);
    throw err;
  }
}

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
