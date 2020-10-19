import React from 'react';
import classes from './UsersList.module.css';
import UsersData from '../UsersData/UsersData';

class UsersList extends React.Component {
    render() {
        // if (!this.props.list) {
        //     return (<span>Loading...</span>)
        // }

        return (
            <div className={classes.UsersList}>
            <table >
                <tr className={classes.TrUsers}>
                    <th className={classes.IdUser}>Номер</th>
                    <th className={classes.ImgUser}>Фотография</th>
                    <th className={classes.FIO}>ФИО</th>
                    <th className={classes.Company}>Компания</th>
                    <th className={classes.Email}>Email</th>
                    <th className={classes.Delete}>Удалить</th>
                </tr>
                <tbody>
                {/* {this.props.list.map(item => {
                    return (
                        <UsersData key={item.id} user={item} />
                    )
                })} */}
                <UsersData/>
                <UsersData/>
                <UsersData/>
                <UsersData/>
                <UsersData/>
                <UsersData/>
                <UsersData/>
                <UsersData/>
                <UsersData/>
                
                </tbody>
            </table>
            </div>
        );
    }
}

export default UsersList;