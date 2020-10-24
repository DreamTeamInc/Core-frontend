import React from 'react';
import classes from './UsersList.module.css';
import UsersData from './UsersData/UsersData';
import {deleteUser, getUsers} from "../../../Reducers/userReducer";
import {connect} from "react-redux";

class UsersList extends React.Component {

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        if (this.props.isFetch) {
            return (<span>Loading...</span>)
        }

        return (
            <div className={classes.UsersList}>
                <table>
                    <tr className={classes.TrUsers}>
                        <th className={classes.IdUser}>ID</th>
                        <th className={classes.ImgUser}>Фотография</th>
                        <th className={classes.FIO}>ФИО</th>
                        <th className={classes.Company}>Компания</th>
                        <th className={classes.Email}>Email</th>
                        <th className={classes.Delete}>Удалить</th>
                    </tr>
                    <tbody>
                    {this.props.list.map(item => {
                        return (
                            <UsersData key={item.id} user={item} onDelete={this.props.deleteUser}/>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    list: state.user.users,
    isFetch: state.user.isFetchUsers
});

export default connect(mapStateToProps, {getUsers, deleteUser})(UsersList);