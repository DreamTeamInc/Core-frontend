import { ModelAPI } from "../API/API"

const SET_MODELS = "SET_MODELS_MODEL_REDUCER"

let initialState = {
    models: [],
}

const modelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODELS:
            return{
                ...state,
                models: action.models,
            };
        default:
            return state;
    }
}

const setModels = (models) => ({type: SET_MODELS, models})


export const getModels = (user_id) => async (dispatch) => {
    const data = await ModelAPI.getModels(user_id);
    dispatch(setModels(data))
};

export default modelReducer;