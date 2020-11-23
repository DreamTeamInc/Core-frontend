import { ModelAPI } from "../API/API"

const SET_MODELS = "SET_MODELS_MODEL_REDUCER"
const SET_CREATE_MODEL = "SET_CREATE_MODEL_MODEL_REDUCER";
const DELETE_MODEL= "DELETE_MODEL_MODEL_REDUCER"

let initialState = {
    models: [],
    createMessage: "",
};
let timerId;

const modelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODELS:
            return{
                ...state,
                models: action.models,
            };
        case SET_CREATE_MODEL:
            return {
                ...state,
                createMessage: action.createMessage
            };
        case DELETE_MODEL:
            return {
                ...state,
                models: state.models.filter(u => u.id !== action.id)
            };
        default:
            return state;
    }
}

const setModels = (models) => ({type: SET_MODELS, models})
const deleteModelAC = (id) => ({type: DELETE_MODEL, id});
const setCreateMessageM = (createMessage) => ({type: SET_CREATE_MODEL, createMessage});


export const getModels = (user_id) => async (dispatch) => {
    const data = await ModelAPI.getModels(user_id);
    dispatch(setModels(data))
};

export const createModel = (info) => async (dispatch) => {
    ModelAPI.createModel(info).then(
        data => {
            if (data) {
                dispatch(setCreateMessageM("Модель создана"));
                clearTimeout(timerId);
                setTimeout(() => {
                    dispatch(setCreateMessageM(""))
                }, 5000)
            }
        }
    );

};

export const deleteModel = (id) => async (dispatch) => {
    await ModelAPI.deleteModel(id);
    dispatch(deleteModelAC(id));
};

export default modelReducer;