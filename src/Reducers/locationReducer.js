import { LocationAPI } from "../API/API"

const SET_LOCATIONS = "SET_LOCATIONS_LOCATION_REDUCER"

const initialState = {
    locations:[]
}

const locationReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_LOCATIONS:
            return{
                ...state,
                locations:action.locations
            };
        default:
            return state;
    }
}

const setLocations = (locations) => ({type: SET_LOCATIONS, locations})
export const getLocations = () => async (dispatch) => {
    let data = await LocationAPI.getLocation();

    dispatch(setLocations(data.locations))
}


export default locationReducer;