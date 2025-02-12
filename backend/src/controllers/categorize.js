const {binarySearchString} = require("../util/search")
const groupedData = require("../util/grouped_data.json")

function categorize(description){
    for(const [category, businesses] of Object.entries(groupedData)){
        if(binarySearchString(businesses,description) != 1){
            return category;
        }
    }
    return "Miscellaneous";
}

module.exports = { categorizeSpending };