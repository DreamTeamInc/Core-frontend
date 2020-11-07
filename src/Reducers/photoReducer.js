import {PhotoAPI} from "../API/API";

const SET_PHOTOS = "SET_PHOTOS_PHOTO_REDUCER";
const SET_PHOTO_MASKS = "SET_PHOTO_MASKS_PHOTO_REDUCER";
const SET_CREATED_PHOTO = "SET_CREATED_PHOTO_PHOTO_REDUCER";
const SET_FETCHING = "SET_FETCHING_PHOTO_REDUCER";

let initialState = {
    photos: [],
    CreateMessage: "",
    isFetching: false
};
let timerId;

const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PHOTOS:
            return {
                ...state,
                photos: [...state.photos, ...action.photos]
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
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        default:
            return state;

    }
};

const setPhotos = (photos) => ({type: SET_PHOTOS, photos});
const setPhotoMasks = (id, masks) => ({type: SET_PHOTO_MASKS, id, masks});
const setCreateMessage = (CreateMessage) => ({type: SET_CREATED_PHOTO, CreateMessage});
const setFetching = (isFetching) => ({type: SET_FETCHING, isFetching});

export const getPhotos = (offset = 0) => async (dispatch) => {
    dispatch(setFetching(true));
    const data = await PhotoAPI.getPhotos(2, offset);
    dispatch(setPhotos(data.results));
    dispatch(setFetching(false))
};

export const getPhotoMasks = (id) => async (dispatch) => {
    const data = await PhotoAPI.getPhotoMasks(id);
    console.log(data);
    if (!data.error)
        dispatch(setPhotoMasks(id, data))
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