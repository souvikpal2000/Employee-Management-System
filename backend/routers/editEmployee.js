const express = require("express");
const router = express.Router();
const Employees = require("../db/models/employees");

router.put("/editemployee/:id", async (req, res) => {
    try{
        const editEmployee = await Employees.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        res.status(200).json({success: true, message: editEmployee});
    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
});

module.exports = router;