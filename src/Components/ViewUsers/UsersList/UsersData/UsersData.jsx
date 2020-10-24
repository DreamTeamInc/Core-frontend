import React from 'react';
import classes from './UsersData.module.css';
import profile_icon from "./../../../../assets/img/Header/Photo_Icon.svg";

class UsersData extends React.Component {
    handleDelete = e => {

    };

    render() {
        return (

                <tr className={classes.UsersData}>
                    <td className={classes.IdUser}>{this.props.user.id}</td>
                    <td className={classes.ImgUser}>
                        <img src={profile_icon} className={classes.UserImg} alt={"avatar"}/>
                    </td>
                    <td className={classes.FIO}>{this.props.user.first_name + ' ' + this.props.user.second_name + ' ' + this.props.user.patronymic}</td>
                    <td className={classes.Company}>{this.props.user.company}</td>
                    <td className={classes.Email}>{this.props.user.email}</td>
                    <td className={classes.Delete} onClick={this.handleDelete}>Удалить</td>
                </tr>

        );
    }
}

export default UsersData;