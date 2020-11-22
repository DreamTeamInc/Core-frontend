import {PhotoAPI} from "../API/API";

const SET_PHOTOS = "SET_PHOTOS_PHOTO_REDUCER";
const SET_PHOTOS_FILTER = "SET_PHOTOS_FILTER_PHOTO_REDUCER";
const SET_PHOTO_MASKS = "SET_PHOTO_MASKS_PHOTO_REDUCER";
const SET_CREATED_PHOTO = "SET_CREATED_PHOTO_PHOTO_REDUCER";
const SET_FETCHING = "SET_FETCHING_PHOTO_REDUCER";
const SET_MASKS_ADD = "SET_MASKS_ADD_PHOTO_REDUCER";
const SET_MASKS_REMOVE = "SET_MASKS_REMOVE_PHOTO_REDUCER";
const SET_LIKE = "SET_LIKE_PHOTO_REDUCER";
const SET_LIKER = "SET_LIKER_PHOTO_REDUCER";

let initialState = {
    photos: [],
    CreateMessage: "",
    isFetching: false,
    activeModel: {}
};
let timerId;

const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PHOTOS:
            return {
                ...state,
                photos: [ ...state.photos, ...action.photos]
            };
        case SET_PHOTOS_FILTER:
            return {
                ...state,
                photos: [ ...action.photos]
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
        case SET_MASKS_ADD:
            return {
                ...state,
                activeModel: action.activeModel
            };
        case SET_MASKS_REMOVE:
            return {
                ...state,
                activeModel: action.activeModel
            };
        case SET_LIKE:
            return {
                ...state,
                likes: action.likes
            };
        case SET_LIKER:
            return {
                ...state,
                likes: action.likes
            };
        default:
            return state;

    }
};

const setPhotos = (photos) => ({type: SET_PHOTOS, photos});
const setPhotosFilter = (photos) => ({type: SET_PHOTOS_FILTER, photos});
const setPhotoMasks = (id, masks) => ({type: SET_PHOTO_MASKS, id, masks});
const setCreateMessage = (CreateMessage) => ({type: SET_CREATED_PHOTO, CreateMessage});
const setFetching = (isFetching) => ({type: SET_FETCHING, isFetching});
const setAddToYourself = (activeModel) => ({type: SET_MASKS_ADD, activeModel});
const setRemoveToYourself = (activeModel) => ({type: SET_MASKS_REMOVE, activeModel});
const setLikes = (likes) => ({type: SET_LIKE, likes});
const setLikesR = (likes) => ({type: SET_LIKER, likes});

export const getPhotos = (mark, location, well, kind, offset = 0, type = true) => async (dispatch) => {
    dispatch(setFetching(true));
    const data = await PhotoAPI.getPhotos(mark, location, well, kind, 2, offset);
    if(type) dispatch(setPhotos(data.results));
    else dispatch(setPhotosFilter(data.results));
    dispatch(setFetching(false))
};

export const getPhotoMasks = (id) => async (dispatch) => {
    const data = await PhotoAPI.getPhotoMasks(id);
    console.log(data);
    if (!data.error)
        dispatch(setPhotoMasks(id, data))
};

export const addMaskToYourself = (user_id, mask_id) => async (dispatch) => {
    const data = await PhotoAPI.addMaskToYourself(user_id, mask_id);

    if (!data.error)
        dispatch(setAddToYourself(data))
};

export const removeMaskToYourself = (user_id, mask_id) => async (dispatch) => {
    const data = await PhotoAPI.removeMaskToYourself(user_id, mask_id);

    if (!data.error)
        dispatch(setRemoveToYourself(data))
};

export const putLike = (user_id, photo_id, mask_id) => async (dispatch) => {
    const data = await PhotoAPI.putLike(user_id, photo_id, mask_id);

    if (!data.error)
        dispatch(setLikes(data))
};

export const removeLike = (user_id, photo_id, mask_id) => async (dispatch) => {
    const data = await PhotoAPI.removeLike(user_id, photo_id, mask_id);
    console.log(data);
    if (!data.error)
        dispatch(setLikesR(data))
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