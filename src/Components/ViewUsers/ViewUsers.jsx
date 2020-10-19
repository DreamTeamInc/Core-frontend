import React from "react";
import classes from "./ViewUsers.module.css";
import UsersList from "../UsersList/UsersList";

class ViewUsers extends React.Component {
   
    constructor(props) {
        super(props);
          this.state = {
              users: []
          };
          this.loadUsers();
      }
  
      loadUsers() {
          fetch('data.json')
              .then(async response => {
                  const data = await response.json();
                this.state.users = data;
              })
      }
  
  
    render() {
        return (
            <div className={classes.ViewUsers}> 
              <div className={classes.TopSide}>
                <button   className={classes.ButtonRegister}
                          onClick={() => {
                            window.location.assign('http://localhost:3000/reg');
                          }} 
                          type="button">
                    Зарегистрировать нового пользователя
                </button>
              </div>
              <div className={classes.Users}>
                      <div className={classes.ViewListUsers}>
                          <UsersList list={this.state.users}/>
                      </div>
                  </div>
            </div>
        );
    }
}


export default ViewUsers;