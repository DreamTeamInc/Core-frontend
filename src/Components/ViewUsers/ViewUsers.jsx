import React from "react";
import classes from "./ViewUsers.module.css";
import UsersList from "./UsersList/UsersList";
import Registration from "../Registration/Registration";

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
          <div>
            <Registration/>
            <div className={classes.ViewUsers}> 

              <div className={classes.Users}>
                      <div className={classes.ViewListUsers}>
                          <UsersList list={this.state.users}/>
                      </div>
                  </div>
            </div>
            <div className={classes.Footer}></div>
            </div>
        );
    }
}


export default ViewUsers;