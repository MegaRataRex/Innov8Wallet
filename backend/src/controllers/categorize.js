const { binarySearchString } = require("../util/search");
const groupedData = require("../util/grouped_data.json");
const subCategories = require("../util/sub_categories.json");

function categorize(description) {
  for (const [category, businesses] of Object.entries(groupedData)) {
    if (binarySearchString(businesses, description) != 1) {
      return category;
    }
  }
  return "Miscellaneous";
}

function subCategorize(description) {
  for (const [category, businesses] of Object.entries(subCategories)) {
    if (binarySearchString(businesses, description) != 1) {
      return category;
    }
  }
}
module.exports = { categorize, subCategorize };
