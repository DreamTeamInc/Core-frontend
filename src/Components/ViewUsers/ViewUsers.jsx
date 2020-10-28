import React from "react";
import classes from "./ViewUsers.module.css";
import UsersList from "./UsersList/UsersList";
import Registration from "../Registration/Registration";

const ViewUsers = () => {
    return (
        <div>
            <Registration/>
            <div className={classes.ViewUsers}>

                <div className={classes.Users}>
                    <div className={classes.ViewListUsers}>
                        <UsersList/>
                    </div>
                </div>
            </div>
            <div className={classes.Footer}/>
        </div>
    )
};


export default ViewUsers;