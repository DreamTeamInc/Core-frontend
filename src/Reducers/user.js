import {UserAPI} from "../API/API";

const SET_AUTH = "SET_AUTH_USER_REDUCER";

let initialState = {
    isAuth: false
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            };
        default:
            return state;

    }
};

const setAuth = (isAuth) => ({type:SET_AUTH, isAuth});
export const isAuth = () => async (dispatch) =>{
    let data = await UserAPI.isAuth();
    console.log(data);
    if (data.isAuthorized)
        dispatch(setAuth(true));
    else
        dispatch(setAuth(false));
};

export const Auth = (email, password, isRemember) => async (dispatch) =>{
    let data = await UserAPI.auth(email, password, isRemember);
    if (data.isAuthorized)
        dispatch(setAuth(true));
    else
        dispatch(setAuth(false))
};

export default user;