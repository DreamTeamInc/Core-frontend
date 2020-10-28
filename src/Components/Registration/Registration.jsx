import React from "react";
import classes from "./Registration.module.css";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {CreateUser} from "../../Reducers/userReducer";

const RegistrationForm = reduxForm({form: 'reg'})((props) => {
    return (
        <form className={classes.FormSignUp} onSubmit={props.handleSubmit}>
            <label htmlFor="inputName" className={classes.FormText}> Имя </label>
            <Field component="input"
                   name="first_name"
                   type="text"
                   id="inputName"
                   className={classes.inputName}
                   required/>
            <label htmlFor="inputSurname" className={classes.FormText}> Фамилия </label>
            <Field component="input"
                   name="second_name"
                   type="text"
                   id="inputSurname"
                   className={classes.inputSurname}
                   required/>
            <label htmlFor="inputMiddlename" className={classes.FormText}> Отчество </label>
            <Field component="input"
                   name="patronymic"
                   type="text"
                   id="inputMiddlename"
                   className={classes.inputMiddlename}
                   required/>
            <label htmlFor="inputBirth" className={classes.FormText}> Дата рождения </label>
            <Field component="input"
                   name="birth_date"
                   type="date"
                   id="inputBirth"
                   className={classes.inputBirth}
                   required/>
            <img className={classes.BirthImg} alt={""}/>
            <label htmlFor="inputSex" className={classes.FormText}> Пол М </label>
            <Field component="input"
                   type="radio"
                   name="sex"
                   className={classes.inputSex}
                   value="1"/>
            <label htmlFor="inputSex" className={classes.FormText}> Ж </label>
            <Field component="input"
                   type="radio"
                   name="sex"
                   className={classes.inputSex}
                   value="2"/>
            <br/>
            <label htmlFor="inputCompany" className={classes.FormText}> Компания </label>
            <Field component="input"
                   name="company"
                   type="text"
                   id="inputCompany"
                   className={classes.inputCompany} required/>
            <label htmlFor="inputPosition" className={classes.FormText}> Должность </label>
            <Field component="input"
                   name="position"
                   type="text"
                   id="inputPosition"
                   className={classes.inputPosition}
                   required/>
            <label htmlFor="inputEmail" className={classes.FormText}> Email </label>
            <Field component="input"
                   name="email"
                   type="email"
                   id="inputEmail"
                   className={classes.inputEmail}
                   required/>
            <label htmlFor="inputPassword" className={classes.FormText}> Пароль </label>
            <Field component="input"
                   name="password"
                   type="password"
                   id="inputPassword"
                   className={classes.inputPassword}
                   required/>

            <button className={classes.BtnSignUp}>
                Зарегистрировать
            </button>
        </form>
    )
});

const Submit = (CreateUser) => (data) => {
    CreateUser(data);
};


const Registration = (props) => {
    return (
        <div className={classes.Registration}>
            <div className={classes.RegistrationText}>Регистрация</div>
            <div className={classes.RegistrationField}>
                <RegistrationForm onSubmit={Submit(props.CreateUser)}/>
            </div>
            {props.CreateMessage}
        </div>
    )
};

const mapStateToProps = (state) =>({
    CreateMessage: state.user.CreateMessage
});

//name или Id
export default connect(mapStateToProps, {CreateUser})(Registration);
