import * as axios from "axios"

const URL = 'https://code-backend.herokuapp.com/';

// const URL = 'http://localhost:8000';

const ms = axios.create({
    baseURL: URL,
    withCredentials: true
});

export const UserAPI = {
    isAuth() {
        return ms.get('/auth/').then(response => response.data, err => err);
    },

    login(email, password, isRemember) {
        return ms.post('/auth/', {email, password, isRemember}).then(response => response.data);
    },
    logout() {
        return ms.delete('/auth/').then(response => response.data);
    },

    createUser(data) {
        return ms.post('/users/create/', {...data, is_su: false}).then(response => response.data)
    },

    getUsers() {
        return ms.get('/users/all/').then(response => response.data);
    },

    deleteUser(id) {
        return ms.delete(`/users/${id}/`).then(response => response.data);
    }
};

export const PhotoAPI = {
    getPhotos() {
        return ms.get('/photo/all/').then(response => response.data)
    },

    getPhotoMasks(id) {
        return ms.get(`/photo/${id}/masks`).then(response => response.data)
    }
};

export const LocationAPI = {
    getLocation(){
        return ms.get('/locations/all/').then(result=>result.data)
    },
    getWells(){
        return ms.get(`/wells/all/`).then(result=>result.data)
    }
}