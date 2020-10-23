import React from 'react';
import classes from "./Login.module.css";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {LogIn} from "../../Reducers/userReducer";

const LoginForm = reduxForm({form: 'login'})((props) => {
    return (
        <form className={classes.FormSignIn} onSubmit={props.handleSubmit}>
            <label htmlFor="email" className={classes.FormText}>Email</label>

            <Field component={"input"}
                   type="text"
                   name="email"
                   className={classes.inputEmail}/>
            <label htmlFor="password" className={classes.FormText}>Пароль</label>
            <Field component={"input"}
                   type="password"
                   name="password"
                   className={classes.inputPassword}/>
            <Field
                component={"input"}
                type="checkbox"
                name="isRemember"/>
            <button className={classes.BtnSignIn}> Войти</button>
        </form>
    )
});

const Submit = (login) => ({email, password, isRemember}) => {
    login(email, password, isRemember || false);
};

const Login = (props) => {
    return (
        <>
            {props.isAuth
                ? <Redirect to='/'/>
                : <div className={classes.Login}>
                    <div className={classes.LoginText}>Вход</div>
                    <LoginForm onSubmit={Submit(props.LogIn)}/>
                </div>}
        </>
    )
};


const mapStateToProps = (state) => ({
    isAuth: state.user.isAuth
});

export default connect(mapStateToProps, {LogIn})(Login);