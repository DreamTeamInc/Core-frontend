import React from 'react';
import classes from './UsersData.module.css';
import profile_icon from "./../../../../assets/img/Header/Photo_Icon.svg";

class UsersData extends React.Component {
    handleDelete = e => {
        
    };
    render() {
        // return (
        //     <div className={classes.UserData}>
        //     <tr className={classes.TrUser}>
        //         <td className={classes.IdUser}>{this.props.user.id}</td>
        //         <td className={classes.ImgUser}>
        //             <img src={`images/${this.props.user.image}.svg`} className={classes.UserImg}/>
        //         </td>
        //         <td className={classes.FIO}>{this.props.user.fname + ' ' + this.props.user.lname + ' ' + this.props.user.mname}</td>
        //         <td className={classes.Company}>{this.props.user.company}</td>
        //         <td className={classes.Email}>{this.props.user.email}</td>
        //         <td className={classes.Delete}>{this.props.user.delete}</td>
        //     </tr>
        //     </div>
        // );

       
        return (
            <tr className={classes.UsersData}>
                <td className={classes.IdUser}>1</td>
                <td className={classes.ImgUser}>
                    <img src={profile_icon} className={classes.UserImg}/>
                </td>
                <td className={classes.FIO}>Иван Иванов Иванович</td>
                <td className={classes.Company}>Компания111</td>
                <td className={classes.Email}>email@gmail.com</td>
                <td className={classes.Delete} onClick={this.handleDelete} type="button">Удалить</td>
            </tr>
            
        );
    }
}

export default UsersData;