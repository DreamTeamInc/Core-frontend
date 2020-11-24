import React from 'react';
import classes from "./Login.module.css";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {LogIn} from "../../Reducers/userReducer";
import {confirmAlert} from "react-confirm-alert";
import "./Confirm.css"

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
                name="isRemember"
                className={classes.inputRemember}/>
                <div className={classes.isRemember}>Запомнить меня</div>
            <button className={classes.BtnSignIn}> Войти</button>
        </form>
    )
});



class Login extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.loginMessage !== ""){
            confirmAlert({
                title: 'LOGIN',
                message: this.props.loginMessage,
                buttons:[]
            });
        }
    }

    Submit = ({email, password, isRemember}) => {
        this.props.LogIn(email, password, isRemember || false);
    };
    render() {
        return (
            <>
                {this.props.isAuth
                    ? <Redirect to='/'/>
                    : <div className={classes.Login}>
                        <div className={classes.LoginText}>Вход</div>
                        <LoginForm onSubmit={this.Submit}/>
                    </div>}
            </>
        )
    }
}


const mapStateToProps = (state) => ({
    isAuth: state.user.isAuth,
    loginMessage: state.user.loginMessage
});

export default connect(mapStateToProps, {LogIn})(Login);