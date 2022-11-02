import React, { useContext, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { EmployeeContext } from "../../App";
import useStyles from "./styles";

const AddEmployeeModal = ({open, setOpen}) => {
    const {setEmployees} = useContext(EmployeeContext);
    const [newEmployee, setNewEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        organization: ""
    })
    const classes = useStyles();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '1rem',
        boxShadow: 24,
        p: 4,
    };

    const handleClose = () => {
        setOpen(false);
    }

    const setInfo = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewEmployee((preValue) => {
            return{
                ...preValue,
                [name]: value
            }
        })
    }

    const saveNewEmployee = async () => {
        if(!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email || !newEmployee.organization){
            alert("Fill up all the Details");
            return;
        }
        try{
            const res = await fetch("/addemployee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newEmployee)
            });
            const data = await res.json();
            if(!data.success){
                return alert(data.message);
            }
            setEmployees((preValue) => {
                return[
                    ...preValue,
                    data.message
                ]
            });
            setOpen(false);
        }catch(err){
            console.log("Error 503 : Service Unavailable");
        } 
    }

    return(
        <>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add New Employee
                    </Typography>
                    <Typography id="modal-modal-description" component={'span'} variant={'body2'} sx={{ mt: 1 }}>
                        <TextField id="outlined-basic" label="First Name" variant="outlined" sx={{ mt: 2, width: '100%' }} name="firstName" onChange={setInfo} />
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={{ mt: 2, width: '100%' }} name="lastName" onChange={setInfo} />
                        <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ mt: 2, width: '100%' }} name="email" onChange={setInfo} />
                        <TextField id="outlined-basic" label="Organization" variant="outlined" sx={{ mt: 2, width: '100%' }} name="organization" onChange={setInfo} />
                    </Typography>
                    <Typography sx={{ mt: 3 }} className={classes.alignBtn}>
                        <Button variant="contained" size="medium" style={{marginRight: '1rem'}} onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" size="medium" color="success" onClick={saveNewEmployee}>Save</Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default AddEmployeeModal;