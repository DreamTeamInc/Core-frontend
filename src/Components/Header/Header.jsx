import React from "react";
import classes from "./Header.module.css"
import profile_icon from "./../../assets/img/Header/Photo_Icon.svg"
import logout_icon from "./../../assets/img/Header/Logout_Icon.svg"
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {LogOut} from "../../Reducers/userReducer";

const Header = (props) => {
    return (
        <header className={classes.Header}>
            <div className={classes.Links_Container}>
                <div className={classes.Links}>
                    <NavLink className={classes.Link} to="#">Фото</NavLink>
                    <div className={classes.Border}/>
                    <NavLink className={classes.Link} to="#">Галерея</NavLink>
                    <div className={classes.Border}/>
                    <NavLink className={classes.Link} to="#">Пользователи</NavLink>
                </div>
            </div>
            <div className={classes.Profile_info}>
                <img className={classes.Profile_icon}
                     src={profile_icon} alt="profile"/>
                <span className={classes.User_name}>Иван Иванов</span>
            </div>
            <div  className={classes.Logout_container}>
                <div className={classes.Logout} onClick={props.LogOut}>
                    <img src={logout_icon} alt="logout"/>
                    <span className={classes.Logout_text}>Выйти</span>
                </div>
            </div>
        </header>
    )
};


const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {LogOut})(Header);