const axios = require("axios");

async function isHoliday(date, countryCode = "MX") {
  try {
    const year = new Date(date).getFullYear();
    const response = await axios.get(
      `https://date.nager.at/Api/v2/PublicHolidays/${year}/${countryCode}`
    );
    const holidays = response.data.map((h) => h.date);
    return holidays.includes(date);
  } catch (err) {
    console.error("Error fetching holiday data:", err);
    return false;
  }
}

module.exports = { isHoliday };
