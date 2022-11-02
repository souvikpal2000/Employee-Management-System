const express = require("express");
const Employees = require("../db/models/employees");
const router = express.Router();

router.post("/addemployee", async (req, res) => {
    try{
        const newEmployee = new Employees(req.body);
        await newEmployee.save();
        res.status(200).json({success: true, message: newEmployee});
    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
});

module.exports = router;