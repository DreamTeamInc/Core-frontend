import { LocationAPI } from "../API/API"

const SET_LOCATIONS = "SET_LOCATIONS_LOCATION_REDUCER"
const SET_WELLS = "SET_WELLS_LOCATION_REDUCER"
const SET_WELLS_IN_LOCATION = "SET_WELLS_IN_LOCATION_LOCATION_REDUCER"


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
        case SET_WELLS_IN_LOCATION:
            return {
                ...state,
                well: action.well
                // locations: state.locations.map(p => {
                //     if (p.location !== action.location)
                //         return p;
                //     else
                //         return {
                //             ...p,
                //             wells_in_location: action.wells_in_location
                //         }
                // })
            };
        default:
            return state;
    }
}

const setLocations = (locations) => ({type: SET_LOCATIONS, locations})
const setWells = (wells) => ({type: SET_WELLS, wells})
const setWellsInLocation = (location, well) => ({type: SET_WELLS_IN_LOCATION,location, well})

export const getLocations = () => async (dispatch) => {
    let data = await LocationAPI.getLocation();

    dispatch(setLocations(data.locations))
}


export const getWells = () => async (dispatch) => {
    let data = await LocationAPI.getWells();

    dispatch(setWells(data.wells))
}

export const getWellsInLocation = (location) => async (dispatch) => {
    const data = await LocationAPI.getWellsInLocation(location);
    dispatch(setWellsInLocation(location, data.well))
};

export default locationReducer;