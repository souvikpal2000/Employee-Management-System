import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    tableContainer: {
        width: "90%"
    },
    delete: {
        color: "red"
    },
    alignBtn: {
        float: "right"
    },
    event: {
        cursor: "pointer !important",
        "&:hover": {
            color: "#3e85d2 !important"
        }
    }
})

export default useStyles;