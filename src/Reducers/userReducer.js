import {UserAPI} from "../API/API";

const SET_AUTH = "SET_AUTH_USER_REDUCER";
const SET_FETCHING = "SET_FETCHING_USER_REDUCER";
const SET_CREATED = "SET_CREATED_USER_REDUCER";
const SET_CURRENT_USER = "SET_CURRENT_USER_USER_REDUCER";

let initialState = {
    isAuth: false,
    isFetching: false,
    currentUser: {},
    CreateMessage: ""
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
                CreateMessage: action.CreateMessage
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser
            };
        default:
            return state;

    }
};
const setFetching = (fetch) => ({type: SET_FETCHING, fetch});

const setAuth = (isAuth) => ({type: SET_AUTH, isAuth});

const setCreateMessage = (CreateMessage) => ({type: SET_CREATED, CreateMessage});

const setCurrentUser = (currentUser) => ({type: SET_CURRENT_USER, currentUser});

export const isAuth = () => async (dispatch) => {
    dispatch(setFetching(true));
    let data = await UserAPI.isAuth();
    console.log(data);
    if (data.isAuthorized) {
        let currentUser = {
            id: data.id,
            first_name: data.first_name,
            second_name: data.second_name,
            patronymic: data.patronymic,
            birth_date: data.birth_date,
            email: data.email,
            company: data.company,
            position: data.position,
            sex: data.sex,
            is_su: data.is_su,
            created_date: data.created_date
        };
        dispatch(setCurrentUser(currentUser));
        dispatch(setAuth(true));
    } else
        dispatch(setAuth(false));
    dispatch(setFetching(false))
};

export const LogIn = (email, password, isRemember) => async (dispatch) => {
    let data = await UserAPI.login(email, password, isRemember);
    if (data.isAuthorized) {
        let currentUser = {
            id: data.id,
            first_name: data.first_name,
            second_name: data.second_name,
            patronymic: data.patronymic,
            birth_date: data.birth_date,
            email: data.email,
            company: data.company,
            position: data.position,
            sex: data.sex,
            is_su: data.is_su,
            created_date: data.created_date
        };
        dispatch(setCurrentUser(currentUser));
        dispatch(setAuth(true));
    } else
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

export const CreateUser = (info) => async (dispatch) => {
    let data = await UserAPI.createUser(info);
    if (data) {
        dispatch(setCreateMessage("Пользователь создан"));
        setTimeout(() => {
            dispatch(setCreateMessage(""))
        }, 5000)
    }
};

export default userReducer;