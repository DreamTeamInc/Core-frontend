import { ModelAPI } from "../API/API"

const SET_MODELS = "SET_MODELS_MODEL_REDUCER";
const SET_CREATE_MODEL = "SET_CREATE_MODEL_MODEL_REDUCER";
const SET_ACTIVE_MODEL = "SET_ACTIVE_MODEL_PHOTO_REDUCER";
const DELETE_MODEL= "DELETE_MODEL_MODEL_REDUCER";
const DELETE_MODEL_MASK= "DELETE_MODEL_MASK_MODEL_REDUCER";
const SET_MODEL_MASKS = "SET_MODEL_MASKS_MODEL_REDUCER"

let initialState = {
    models: [],
    createMessage: "",
    activeModel: [],
    masksModel: [],
}
let timerId;

const modelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODELS:
            return{
                ...state,
                models: action.models,
            };
        case SET_MODEL_MASKS:
            return{
                ...state,
                masksModel: action.masksModel,
            };
        case SET_CREATE_MODEL:
            return {
                ...state,
                createMessage: action.createMessage
            };
        case SET_ACTIVE_MODEL:
            return {
                ...state,
                activeModel: action.activeModel
            };
        case DELETE_MODEL:
            return {
                ...state,
                models: state.models.filter(u => u.id !== action.id)
            };
        case DELETE_MODEL_MASK:
        return {
            ...state,
            masksModel: state.masksModel.filter(u => u.id !== action.mask_id)
        };
        default:
            return state;
    }
}

const setModels = (models) => ({type: SET_MODELS, models})
const setModelMasks = (masksModel) => ({type: SET_MODEL_MASKS, masksModel})
const setActiveModule = (activeModel) => ({type: SET_ACTIVE_MODEL, activeModel})
const deleteModelAC = (id) => ({type: DELETE_MODEL, id});
const deleteMask = (mask_id) => ({type: DELETE_MODEL_MASK, mask_id});
const setCreateMessageM = (createMessage) => ({type: SET_CREATE_MODEL, createMessage});


export const getModels = (user_id) => async (dispatch) => {
    const data = await ModelAPI.getModels(user_id);
    dispatch(setModels(data))
};
export const getModelMasks = (user_id) => async (dispatch) => {
    const data = await ModelAPI.getModelMasks(user_id);
    dispatch(setModelMasks(data))
};

export const getActiveModel = (user_id) => async (dispatch) => {
    const data = await ModelAPI.getActiveModel(user_id);
    dispatch(setActiveModule(data))
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

export const deleteModelMask = (user_id, mask_id) => async (dispatch) => {
    await ModelAPI.deleteModelMask(user_id, mask_id);
    dispatch(deleteMask(mask_id));
};

export default modelReducer;