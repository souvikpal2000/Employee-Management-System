const express = require("express");
const Employees = require("../db/models/employees");
const router = express.Router();

router.post("/addemployee", async (req, res) => {
    try{
        const employee = await Employees.findOne({email: req.body.email});
        if(employee){
            return res.status(409).json({success: false, message: "This Email is already Registered"});
        }
        const newEmployee = new Employees(req.body);
        await newEmployee.save();
        res.status(200).json({success: true, message: newEmployee});
    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
});

module.exports = router;