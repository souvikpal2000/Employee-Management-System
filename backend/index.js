const express = require("express");
const app = express();
require("./db/connection");

app.use(express.json());

const AddEmployee = require("./routers/addEmployee");
const GetEmployees = require("./routers/getEmployees");
const DeleteEmployee = require("./routers/deleteEmployee");
const EditEmployee = require("./routers/editEmployee");
app.use(AddEmployee);
app.use(GetEmployees);
app.use(DeleteEmployee);
app.use(EditEmployee);

const PORT = 3030;
app.listen(PORT, (err) => {
    if(err){
        return console.log(`Something went wrong : ${err}`)
    }
    console.log("Server running at PORT 3030");
})