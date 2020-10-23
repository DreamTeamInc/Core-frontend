import {UserAPI} from "../API/API";

const SET_AUTH = "SET_AUTH_USER_REDUCER";
const SET_FETCHING = "SET_FETCHING_USER_REDUCER";
const SET_CREATED = "SET_CREATED_USER_REDUCER";

let initialState = {
    isAuth: false,
    isFetching: false,
    Create:""
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            };
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.fetch
            };
        case SET_CREATED:
            return {
                ...state,
                Create: action.Create
            };
        default:
            return state;

    }
};
const setFetching = (fetch) => ({type:SET_FETCHING, fetch});

const setAuth = (isAuth) => ({type:SET_AUTH, isAuth});
export const isAuth = () => async (dispatch) =>{
    dispatch(setFetching(true));
    let data = await UserAPI.isAuth();
    if (data.isAuthorized)
        dispatch(setAuth(true));
    else
        dispatch(setAuth(false));
    dispatch(setFetching(false))
};

export const LogIn = (email, password, isRemember) => async (dispatch) =>{
    let data = await UserAPI.login(email, password, isRemember);
    if (data.isAuthorized)
        dispatch(setAuth(true));
    else
        dispatch(setAuth(false))
};

export const LogOut = () => async (dispatch) => {
    dispatch(setFetching(true));
    let data = await UserAPI.logout();
    if (data.isAuthorized)
        dispatch(setAuth(true));
    else
        dispatch(setAuth(false));
    dispatch(setFetching(false))
};
const setCreate = (Create) => ({type:SET_CREATED, Create});

export const CreateUser = (info) => async (dispatch) => {
    let data = await UserAPI.createUser(info);
    if (data){
        dispatch(setCreate("Пользователь создан"));
        setTimeout(()=>{dispatch(setCreate(""))}, 5000)

    }
};

export default userReducer;