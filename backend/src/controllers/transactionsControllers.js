const db = require("../db");
const { categorizeSpending } = require("../services/categorize");

exports.addTransaction = (req,res) => {
    const {amount,category,type,description} = req.body;
    const userId = req.user.userId

    if(!amount || !type){
        return res.status(400).json({error : "Todos los campos son requeridos"})
    }
    
    if(!category){
        category = categorizeSpending(description);
    }

    res.json({ description, amount, category });

    db.query(
        "INSERT INTO TRANSACTIONS "
    )
}