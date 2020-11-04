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
    getUser(id){
        return ms.get(`/users/${id}`).then(response => response.data);
    },
    deleteUser(id) {
        return ms.delete(`/users/${id}/`).then(response => response.data);
    }
};

export const PhotoAPI = {
    getPhotos() {
        return ms.get('/photo/all/').then(response => response.data)
    },
    createPhoto(file, location,  well, depth, kind, user) {
        const formData = new FormData();
        formData.append( "photo", file);
        formData.append( "well", well);
        formData.append( "depth", depth);
        formData.append( "location", location);
        formData.append( "kind", kind);
        formData.append( "user", user);
        return ms.post('/photo/create/',formData, {
            headers: {
                'Content-Type':'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            }
        }).then(res=>res.data)
    },

    getPhotoMasks(id) {
        return ms.get(`/photo/${id}/masks/`).then(response => response.data)
    },

    createMask(classification, mask, likes, user, photo, model = 5){
        const formData = new FormData();
        formData.append( "classification_path", classification);
        formData.append( "path", mask);
        formData.append( "likes", likes);
        formData.append( "user", user);
        formData.append( "photo", photo);
        formData.append( "model", model);
        return ms.post(`/mask/create/`, formData, {
            headers: {
                'Content-Type':'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            }
        }).then(res=>res.data)
    }
};

export const LocationAPI = {
    getLocation(){
        return ms.get('/locations/all/').then(result=>result.data)
    },
    getWells(){
        return ms.get(`/wells/all/`).then(result=>result.data)
    },
    getWellsInLocation(location){
        return ms.get(`/wells/${location}/`).then(result=>result.data)
    }

};

//photo_path = file
//well = скважина
//depth = глубина Int
//location string
//kind
//id