const express = require("express");
const Employees = require("../db/models/employees");
const router = express.Router();

router.get("/getemployees", async (req, res) => {
    try{
        const employees = await Employees.find();
        res.status(500).json({success: true, message: employees});
    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
});

module.exports = router;