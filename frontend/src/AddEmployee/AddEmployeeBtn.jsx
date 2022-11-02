import React, { useState } from "react";
import Button from '@mui/material/Button';
import useStyles from "./styles";
import AddEmployeeModal from "./AddEmployeeModal";

const AddEmployeeBtn = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    return(
        <>  
            <div className={classes.buttonContainer}>
                <Button variant="contained" size="large" className={classes.button} onClick={handleOpen}>Add Employee</Button>
            </div>

            <AddEmployeeModal open={open} setOpen={setOpen} />
        </>
    )
}

export default AddEmployeeBtn;