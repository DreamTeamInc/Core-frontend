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
    getPhotos(mark="", location="",well="", kind="", limit, offset) {
        return ms.get(`/photo/all/?tagged=${mark}&location=${location}&well=${well}&kind=${kind}&limit=${limit}&offset=${offset}`).then(response => response.data)
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
    },

    addMaskToYourself(user_id, mask_id) {
        return ms.put(`/user/${user_id}/mask/${mask_id}/add/`).then(response => response.data)
    },

    removeMaskToYourself(user_id, mask_id) {
        return ms.put(`/user/${user_id}/mask/${mask_id}/remove/`).then(response => response.data)
    },

    putLike(user_id, photo_id, mask_id) {
        return ms.put(`/user/${user_id}/photo/${photo_id}/like_mask/${mask_id}/`).then(response => response.data)
    },

    removeLike(user_id, photo_id, mask_id) {
        return ms.put(`/user/${user_id}/photo/${photo_id}/dislike_mask/${mask_id}/`).then(response => response.data)
    },
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

export const ModelAPI = {
    getModels(user_id){
        return ms.get(`/users/${user_id}/model/all/`).then(result=>result.data)
    },
    getActiveModel(user_id)
    {
        return ms.get(`user/${user_id}/get_active_model`).then(result=>result.data)
    },
    createModel(is_default, name, user, is_active, kind) {
        const formData = new FormData();
        formData.append( "is_default", is_default);
        formData.append( "name", name);
        formData.append( "user", user);
        formData.append( "is_active", is_active);
        formData.append( "kind", kind);
        return ms.post('/model/create/', formData).then(response => response.data)
    },
    deleteModel(id) {
        return ms.delete(`/model/${id}/`).then(response => response.data);
    }
};
//photo_path = file
//well = скважина
//depth = глубина Int
//location string
//kind
//id