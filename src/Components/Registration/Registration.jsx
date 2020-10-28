import React from "react";
import classes from "./Registration.module.css";
import withAuthRedirect from "../../hoc/withAuthRedirect";

class Registration extends React.Component {
  state = {
    inputName: '',
    inputSurname: '',
    inputMiddlename: '',
    inputBirth: '',
    inputSex: '',
    inputCompany: '',
    // inputPosition: '',
    inputEmail: '',
    inputPassword: ''
  };

    handle_change = e => {
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
            <div className={classes.Registration}>
                <div className={classes.RegistrationText}>Регистрация</div>
                <div className={classes.RegistrationField}>
                    <form className={classes.FormSignUp} onSubmit={e => this.props.handle_signup(e, this.state)}>
                        <label htmlFor="inputName" className={classes.FormText}> Имя </label>
                        <input type="text" onChange={this.handleChange} id="inputName" className={classes.inputName}
                               required/>
                        <label htmlFor="inputSurname" className={classes.FormText}> Фамилия </label>
                        <input type="text" onChange={this.handleChange} id="inputSurname"
                               className={classes.inputSurname} required/>
                        <label htmlFor="inputMiddlename" className={classes.FormText}> Отчество </label>
                        <input type="text" onChange={this.handleChange} id="inputMiddlename"
                               className={classes.inputMiddlename} required/>
                        <label htmlFor="inputBirth" className={classes.FormText}> Дата рождения </label>
                        <input type="date" onChange={this.handleChange} id="inputBirth" className={classes.inputBirth}
                               required/>
                        <img className={classes.BirthImg} alt=""/>
                        <label htmlFor="inputSex" className={classes.FormText}> Пол М </label>
                        <input type="radio" onChange={this.handleChange} name="inputSex" className={classes.inputSex}
                               value="man"/>
                        <label htmlFor="inputSex" className={classes.FormText}> Ж </label>
                        <input type="radio" onChange={this.handleChange} name="inputSex" className={classes.inputSex}
                               value="woman"/>
                        <br/>
                        <label htmlFor="inputCompany" className={classes.FormText}> Компания </label>
                        <input type="text" onChange={this.handleChange} id="inputCompany"
                               className={classes.inputCompany} required/>
                        <label htmlFor="inputEmail" className={classes.FormText}> Email </label>
                        <input type="email" onChange={this.handleChange} id="inputEmail" className={classes.inputEmail}
                               required/>
                        <label htmlFor="inputPassword" className={classes.FormText}> Пароль </label>
                        <input type="password" onChange={this.handleChange} id="inputPassword"
                               className={classes.inputPassword} required/>

        <button className={classes.BtnSignUp} onClick={this.signUp} type="button"> Зарегистрировать </button>
          </form>
        </div>
      </div>
    );
  }
}

//name или Id
export default withAuthRedirect(Registration);
