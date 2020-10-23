import * as axios from "axios"

// const URL = 'https://code-backend.herokuapp.com/';

const URL = 'http://localhost:8000';

const ms = axios.create({
    baseURL: URL,
    withCredentials: true

});

export const UserAPI = {
    isAuth() {
        return ms.get('/auth/').then(response => response.data);
    },

    login (email, password, isRemember){
        return ms.post('/auth/', {email, password, isRemember}).then(response => response.data);
    },
    logout(){
        return ms.delete('/auth/').then(response => response.data);
    },

    createUser(){
        return ms.post('/users/create/',{
            id: 1224,
            first_name: "George1",
            second_name: "Durak1",
            patronymic: "Patniza1",
            birth_date: "2020-10-11",
            email: "csdfhsasadd@fdgdf.tu",
            password: "121123213",
            company: "ewr123we",
            position: "df213gdgr",
            sex: 2,
            is_su: true,
            created_date: "2020-10-21"
        })
    }
};