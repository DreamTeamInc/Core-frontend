import React from "react";
import classes from "./Registration.module.css";

class Registration extends React.Component {
  render() {
    return (
      <div className={classes.Registration}>
        <div className={classes.RegistrationText}>Регистрация</div>
        <div className={classes.RegistrationField}>
          <form className={classes.FormSignUp}>
            <label for="inputName" className={classes.FormText}> Имя </label>
            <input type="text" onChange={this.handleNameChange} id="inputName" className={classes.inputName} required />
            <label for="inputSurname" className={classes.FormText}> Фамилия </label>
            <input type="text" onChange={this.handleSurnameChange} id="inputSurname" className={classes.inputSurname} required />
            <label for="inputMiddlename" className={classes.FormText}> Отчество </label>
            <input type="text" onChange={this.handleMiddlenameChange} id="inputMiddlename" className={classes.inputMiddlename} required />
            <label for="inputBirth" className={classes.FormText}> Дата рождения </label>
            <input type="date"  id="inputBirth" className={classes.inputBirth} required />
            <img className={classes.BirthImg}/>
            <label for="inputSex" className={classes.FormText}>  Пол  М </label>
            <input type="radio"  id="inputSex" className={classes.inputSex} required />
            <label for="inputSex" className={classes.FormText}> Ж  </label>
            <input type="radio"  id="inputSex" className={classes.inputSex} required />
            <br/>
            <label for="inputCompany" className={classes.FormText}> Компания </label>
            <input type="text"  id="inputCompany" className={classes.inputCompany} required />
            <label for="inputEmail" className={classes.FormText}> Email </label>
            <input type="email" id="inputEmail" className={classes.inputEmail} required />
            <label for="inputPassword" className={classes.FormText}> Пароль </label>
            <input type="password"  id="inputPassword" className={classes.inputPassword} required />

        <button className={classes.BtnSignUp} onClick={this.signUp} type="button"> Зарегистрировать </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
