import React, { useState, useEffect, createContext } from "react";
import Header from "./Components/Header/Header";
import EmployeeTable from "./Components/EmployeeTable/EmployeeTable";
import AddEmployeeBtn from "./Components/AddEmployee/AddEmployeeBtn";

export const EmployeeContext = createContext();

const App = () => {
    const [employees, setEmployees] = useState([]);

    const getEmployees = async () => {
        try{
            const res = await fetch("/getemployees", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            const data = await res.json();
            if(data.success){
                setEmployees(data.message);
            }
        }catch(err){
            console.log("Error 503 : Service Unavailable");
        }   
    }

    useEffect(() => {
        getEmployees();
    }, []);

    return(
        <>
            <div className="container">
                <EmployeeContext.Provider value={{employees, setEmployees}}>
                    <Header/>
                    <AddEmployeeBtn/>
                    <EmployeeTable/>
                </EmployeeContext.Provider>
            </div>  
        </>
    )
}

export default App;