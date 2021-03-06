import {UserAPI} from "../API/API";

const SET_AUTH = "SET_AUTH_USER_REDUCER";
const SET_FETCHING = "SET_FETCHING_USER_REDUCER";
const SET_CREATED = "SET_CREATED_USER_REDUCER";
const SET_CURRENT_USER = "SET_CURRENT_USER_USER_REDUCER";
const SET_USERS = "SET_USERS_USER_REDUCER";
const SET_FETCHING_USERS = "SET_FETCHING_USER_USER_REDUCER";
const DELETE_USER = "DELETE_USER_USER_REDUCER";
const CREATE_USER = "CREATE_USER_USER_REDUCER";
const SET_LOGIN ="SET_LOGIN_USER_REDUCER";

let initialState = {
    isAuth: false,
    isFetching: true,
    currentUser: {},
    loginMessage: "",
    CreateMessage: "",
    users: [],
    isFetchUsers: false
};

let timerId;

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
        case SET_LOGIN:
            return {
                ...state,
                loginMessage: action.loginMessage
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_FETCHING_USERS:
            return {
                ...state,
                isFetchUsers: action.fetch
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(u => u.id !== action.id)
            };
        case CREATE_USER:
            return {
                ...state,
                users: [...state.users, action.user]
            };
        default:
            return state;

    }
};

const setFetching = (fetch) => ({type: SET_FETCHING, fetch});
const setUsersFetching = (fetch) => ({type: SET_FETCHING_USERS, fetch});

const setAuth = (isAuth) => ({type: SET_AUTH, isAuth});

const setCreateMessage = (CreateMessage) => ({type: SET_CREATED, CreateMessage});
const setLoginMessage = (loginMessage) => ({type: SET_LOGIN, loginMessage});

const setCurrentUser = (currentUser) => ({type: SET_CURRENT_USER, currentUser});

const setUsers = (users) => ({type: SET_USERS, users});

const deleteUserAC = (id) => ({type: DELETE_USER, id});
const createUser = (user) => ({type: CREATE_USER, user});

export const isAuth = () => async (dispatch) => {
    dispatch(setFetching(true));
    let data = await UserAPI.isAuth();
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
    } else {
        dispatch(setAuth(false));
        dispatch(setLoginMessage("Неправильный Логин или Пароль"))
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            dispatch(setLoginMessage(""))
        }, 3000)
    }
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
    UserAPI.createUser(info).then(
        data => {
            if (data) {
                dispatch(createUser(info));
                dispatch(setCreateMessage("Пользователь создан"));
                clearTimeout(timerId);
                timerId = setTimeout(() => {
                    dispatch(setCreateMessage(""))
                }, 3000)
            }
        },
        err => {
            dispatch(setCreateMessage(err.response.data.email ? err.response.data.email[0] : "Укажите пол"));
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                dispatch(setCreateMessage(""))
            }, 3000)
        });

};

export const getUsers = () => async (dispatch) => {
    dispatch(setUsersFetching(true));
    let data = await UserAPI.getUsers();
    if (data) {
        dispatch(setUsers(data));
        dispatch(setUsersFetching(false));
    }
};

export const deleteUser = (id) => async (dispatch) => {
    await UserAPI.deleteUser(id);
    dispatch(deleteUserAC(id));
};


export default userReducer;