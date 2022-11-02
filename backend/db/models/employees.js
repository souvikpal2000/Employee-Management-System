const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    organization : {
        type: String,
        required: true
    }
});


const Employees = new mongoose.model("employee", employeesSchema);
module.exports = Employees;