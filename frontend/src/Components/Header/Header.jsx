import React from "react";
import useStyles from "./styles";

const Header = () => {
    const classes = useStyles();
    return(
        <>  
            <div className={classes.headerContainer}>
                <h1>Employee Management System</h1>
            </div>
        </>
    )
}

export default Header;