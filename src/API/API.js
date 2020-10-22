import * as axios from "axios"

const URL = 'https://code-backend.herokuapp.com/';

const ms = axios.create({
    baseURL: URL,
    withCredentials: true
});

export const UserAPI = {
    isAuth() {
        return ms.get('/auth').then(response => response.data);
    },

    auth (email, password, isRemember){
        return ms.post('/auth', {email, password, isRemember}).then(response => response.data);
    }
};