import React from "react";
import classes from "./Registration.module.css";
import PropTypes from 'prop-types';

class Registration extends React.Component {
  state = {
    inputName: '',
    inputSurname: '',
    inputMiddlename: '',
    inputBirth: '',
    inputSex: '',
    inputCompany: '',
    inputEmail: '',
    inputPassword: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };
  render() {
    return (
      <div className={classes.Registration}>
        <div className={classes.RegistrationText}>Регистрация</div>
        <div className={classes.RegistrationField}>
          <form className={classes.FormSignUp} onSubmit={e => this.props.handle_signup(e, this.state)}>
            <label for="inputName" className={classes.FormText}> Имя </label>
            <input type="text" onChange={this.handleChange} id="inputName" className={classes.inputName} required />
            <label for="inputSurname" className={classes.FormText}> Фамилия </label>
            <input type="text" onChange={this.handleChange} id="inputSurname" className={classes.inputSurname} required />
            <label for="inputMiddlename" className={classes.FormText}> Отчество </label>
            <input type="text" onChange={this.handleChange} id="inputMiddlename" className={classes.inputMiddlename} required />
            <label for="inputBirth" className={classes.FormText}> Дата рождения </label>
            <input type="date" onChange={this.handleChange} id="inputBirth"  className={classes.inputBirth} required />
            <img className={classes.BirthImg}/>
            <label for="inputSex" className={classes.FormText}>  Пол  М </label>
            <input type="radio" onChange={this.handleChange} name="inputSex" className={classes.inputSex} value="man" />
            <label for="inputSex" className={classes.FormText}> Ж  </label>
            <input type="radio" onChange={this.handleChange} name="inputSex" className={classes.inputSex} value="woman" />
            <br/>
            <label for="inputCompany" className={classes.FormText}> Компания </label>
            <input type="text" onChange={this.handleChange} id="inputCompany" className={classes.inputCompany} required />
            <label for="inputEmail" className={classes.FormText}> Email </label>
            <input type="email" onChange={this.handleChange} id="inputEmail" className={classes.inputEmail} required />
            <label for="inputPassword" className={classes.FormText}> Пароль </label>
            <input type="password" onChange={this.handleChange} id="inputPassword" className={classes.inputPassword} required />

        <button className={classes.BtnSignUp} onClick={this.signUp} type="button"> Зарегистрировать </button>
          </form>
        </div>
      </div>
    );
  }
}
//name или Id
export default Registration;