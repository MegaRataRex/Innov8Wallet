const db = require("../db");

exports.addTransaction = (req,res) => {
    const {amount,category,type,description} = req.body;
    const userId = req.user.userId

    if(!amount || !type){
        return res.status(400).json({error : "Todos los campos son requeridos"})
    }


    db.query(
        "INSERT INTO TRANSACTIONS"
    )
}