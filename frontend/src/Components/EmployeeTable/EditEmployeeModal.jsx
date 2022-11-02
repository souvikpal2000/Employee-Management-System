import React, { useContext } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { EmployeeContext } from "../../App";
import useStyles from "./styles";

const EditEmployeeModal = ({editModal, setEditModal}) => {
    const {employees, setEmployees} = useContext(EmployeeContext);
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
        setEditModal({
            open: false,
            id: "",
            dbid: "",
            firstName: "",
            lastName: "",
            email: "",
            organization : ""
        });
    }

    const setInfo = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setEditModal((preValue) => {
            return{
                ...preValue,
                [name]: value
            }
        })
    }

    const saveNewEmployee = async () => {
        if(!editModal.firstName || !editModal.lastName || !editModal.organization){
            alert("Fill up all the Details");
            return;
        }

        const body = {
            firstName: editModal.firstName,
            lastName: editModal.lastName,
            email: editModal.email,
            organization: editModal.organization
        }

        try{
            const res = await fetch(`/editemployee/${editModal.dbid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if(data.success){
                let newArray = [...employees];
                newArray[editModal.id] = data.message;
                setEmployees(newArray);
                setEditModal({
                    open: false,
                    id: "",
                    dbid: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    organization : ""
                });
            }
        }catch(err){
            console.log("Error 503 : Service Unavailable");
        }
    }

    return(
        <>
            <Modal open={editModal.open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Employee
                    </Typography>
                    <Typography id="modal-modal-description" component={'span'} variant={'body2'} sx={{ mt: 1 }}>
                        <TextField id="outlined-basic" label="First Name" variant="outlined" sx={{ mt: 2, width: '100%' }} name="firstName" value={editModal.firstName} onChange={setInfo} />
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={{ mt: 2, width: '100%' }} name="lastName" value={editModal.lastName} onChange={setInfo} />
                        <TextField id="outlined-basic" label="Organization" variant="outlined" sx={{ mt: 2, width: '100%' }} name="organization" value={editModal.organization} onChange={setInfo} />
                    </Typography>
                    <Typography sx={{ mt: 3 }} className={classes.alignBtn}>
                        <Button variant="contained" size="medium" style={{marginRight: '1rem'}} onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" size="medium" color="success" onClick={saveNewEmployee}>Edit</Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default EditEmployeeModal;