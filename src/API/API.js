import * as axios from "axios"

const URL = 'https://code-backend.herokuapp.com/';

const ms = axios.create({
    baseURL: URL
});

export const SegmentationAPI = {
    getSegmentation(file){
        const config = {
            method: 'post',
            url: '/loadphoto',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                file: file
            }
        };


        return ms(config).then(res=>res.data)
    }
};