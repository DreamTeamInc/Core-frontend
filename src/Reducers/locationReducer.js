import { LocationAPI } from "../API/API"

const SET_LOCATIONS = "SET_LOCATIONS_LOCATION_REDUCER"
const SET_WELLS = "SET_WELLS_LOCATION_REDUCER"


const initialState = {
    locations:[],
    wells: [],
}

const locationReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_LOCATIONS:
            return{
                ...state,
                locations:action.locations,
            };
        case SET_WELLS:
            return{
                ...state,
                wells:action.wells
            };
        default:
            return state;
    }
}

const setLocations = (locations) => ({type: SET_LOCATIONS, locations})
const setWells = (wells) => ({type: SET_WELLS, wells})

export const getLocations = () => async (dispatch) => {
    let data = await LocationAPI.getLocation();

    dispatch(setLocations(data.locations))
}


export const getWells = () => async (dispatch) => {
    let data = await LocationAPI.getWells();

    dispatch(setWells(data.wells))
}



export default locationReducer;