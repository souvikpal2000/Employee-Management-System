const express = require("express");
const router = express.Router();
const Employees = require("../db/models/employees");

router.delete("/delemployee/:id", async (req, res) => {
    try{
        await Employees.findOneAndRemove({_id: req.params.id});
        res.status(200).json({success: true, message: "Employee Deleted"});
    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
});

module.exports = router;