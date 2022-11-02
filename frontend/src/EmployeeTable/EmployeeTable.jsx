import React, { useState, useContext } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { EmployeeContext } from "../App";
import useStyles from "./styles";
import EditEmployeeModal from "./EditEmployeeModal";

const DeleteModal = ({modal, setModal}) => {
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
        setModal({
            open : false,
            id: "",
            dbid: ""
        });
    }

    const deleteData = async () => {
        const updatedEmployees = employees.filter((employee, index) => {
            return index != modal.id
        });

        try{
            const res = await fetch(`/delemployee/${modal.dbid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            if(data.success){
                setEmployees(updatedEmployees);
                setModal({
                    open : false,
                    id: "",
                    dbid: ""
                });
            }
        }catch(err){
            console.log("Error 503 : Service Unavailable");
        }
    }

    return(
        <>
            <Modal open={modal.open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete Message?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        You'll lose this data after this action. We can't recover them once you delete.
                        Are you sure you want to <span className={classes.delete}>permanently delete</span> it?
                    </Typography>
                    <Typography sx={{ mt: 3 }} className={classes.alignBtn}>
                        <Button variant="contained" size="medium" style={{marginRight: '1rem'}} onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" size="medium" color="error" onClick={deleteData}>Delete</Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

const EmployeeTable = () => {
    const {employees} = useContext(EmployeeContext);
    const classes = useStyles();
    const [modal, setModal] = useState({
        open: false,
        id: "",
        dbid: ""
    });
    const [editModal, setEditModal] = useState({
        open: false,
        id: "",
        dbid: "",
        firstName: "",
        lastName: "",
        organization : ""
    })

    const handleOpen = (e) => {
        const id = e.target.id;
        const dbid = e.target.getAttribute('dbid');
        setModal({
            open: true,
            id: id,
            dbid: dbid
        });
    }

    const openEditModal = (e) => {
        const id = e.target.id;
        setEditModal({
            open: true,
            id: id,
            dbid: employees[id]._id,
            firstName: employees[id].firstName,
            lastName: employees[id].lastName,
            organization : employees[id].organization
        })
    }

    const style = {
        width: "25%"
    }

    return(
        <>  
            <div className={classes.tableContainer}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={style}>ID</TableCell>
                                <TableCell sx={style}>Employee Name</TableCell>
                                <TableCell sx={style}>Organization</TableCell>
                                <TableCell sx={style}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map((employee, index) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">{index+1}</TableCell>
                                        <TableCell>{employee.firstName + " " + employee.lastName}</TableCell>
                                        <TableCell>{employee.organization}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" size="medium" color="success" style={{marginRight: '1rem'}} id={index} onClick={openEditModal}>Edit</Button>
                                            <Button variant="contained" size="medium" color="error" id={index} dbid={employee._id} onClick={handleOpen}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <DeleteModal modal={modal} setModal={setModal}/>   

            <EditEmployeeModal editModal={editModal} setEditModal={setEditModal} />         
        </>
    )
}

export default EmployeeTable;