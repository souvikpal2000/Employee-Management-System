import React from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useStyles from "./styles";

const FullDetailsModal = ({detailsModal, setDetailsModal}) => {
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
        p: 4
    };

    const handleClose = () => {
        setDetailsModal({
            open: false
        })
    }

    return(
        <>
            <Modal open={detailsModal.open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Employee Details
                    </Typography>
                    <Typography id="modal-modal-description" component={'span'} variant={'body2'}  sx={{ mt: 2 }}>
                        <p><b>Employee ID :</b> {detailsModal.id}</p>
                        <p><b>First Name : </b> {detailsModal.firstName}</p>
                        <p><b>Last Name : </b> {detailsModal.lastName}</p>
                        <p><b>Email :</b> {detailsModal.email}</p>
                        <p><b>Organization :</b> {detailsModal.organization}</p>
                    </Typography>
                    <Typography sx={{ mt: 3 }} className={classes.alignBtn}>
                        <Button variant="contained" size="medium" onClick={handleClose}>Close</Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default FullDetailsModal