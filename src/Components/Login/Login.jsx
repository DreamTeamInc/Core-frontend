import React from 'react';
import classes from "./Login.module.css";

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    };

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = {...prevstate};
            newState[name] = value;
            return newState;
        });
    };

    render() {
        return (
            <div className={classes.Login}>
                <div className={classes.LoginText}>Вход</div>
                <form className={classes.FormSignIn}>
                    <label htmlFor="email" className={classes.FormText}>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        className={classes.inputEmail}
                    />
                    <label htmlFor="password" className={classes.FormText}>Пароль</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        className={classes.inputPassword}
                    />
                    {/* <input type="submit" /> */}
                    <button className={classes.BtnSignIn} type="button"> Войти</button>
                </form>
            </div>
        );
    }
}

export default Login;