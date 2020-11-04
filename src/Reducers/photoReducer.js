import {PhotoAPI} from "../API/API";

const SET_PHOTOS = "SET_PHOTOS_PHOTO_REDUCER";
const SET_PHOTO_MASKS = "SET_PHOTO_MASKS_PHOTO_REDUCER";
const SET_CREATED_PHOTO = "SET_CREATED_PHOTO_PHOTO_REDUCER";

let initialState = {
    photos: [],
    CreateMessage: "",
};
let timerId;

const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PHOTOS:
            return {
                ...state,
                photos: action.photos
            };
        case SET_PHOTO_MASKS:
            return {
                ...state,
                photos: state.photos.map(p => {
                    if (p.id !== action.id)
                        return p;
                    else
                        return {
                            ...p,
                            masks: action.masks
                        }
                })
            };
        case SET_CREATED_PHOTO:
                return {
                    ...state,
                    CreateMessage: action.CreateMessage
                };
        default:
            return state;

    }
};

const setPhotos = (photos) => ({type: SET_PHOTOS, photos});
const setPhotoMasks = (id, masks) => ({type: SET_PHOTO_MASKS, id, masks});
const setCreateMessage = (CreateMessage) => ({type: SET_CREATED_PHOTO, CreateMessage});

export const getPhotos = () => async (dispatch) => {
    const data = await PhotoAPI.getPhotos();
    dispatch(setPhotos(data));
};
export const getPhotoMasks = (id) => async (dispatch) => {
    const data = await PhotoAPI.getPhotoMasks(id);
    dispatch(setPhotoMasks(id, data.masks))
};

export const createPhoto = (info) => async (dispatch) => {
    PhotoAPI.createPhoto(info).then(
        data => {
            if (data) {
                dispatch(setCreateMessage("Фото загружено"));
                clearTimeout(timerId);
                setTimeout(() => {
                    dispatch(setCreateMessage(""))
                }, 5000)
            }
        }
    );

};

export default photoReducer;