import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/GET_SPOTS';
const GET_ONE_SPOT = 'spots/GET_SINGLE_SPOT';
const CURRENT_SPOTS = 'spots/CURRENT_USER_SPOTS'
const CREATE_SPOT = 'spots/CREATE_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const ADD_IMAGE = 'spots/ADD_SPOT_IMAGE';

const GetSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}


export const GetOneSpot = (spot) => {
    return {
        type: GET_ONE_SPOT,
        spot
    }
}

const GetCurrentSpots = (spots) => {
    return {
        type: CURRENT_SPOTS,
        spots
    }
}
const CreateSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const UpdateSpot = (spot, spotId) => {
    return {
        type: UPDATE_SPOT,
        spot,
        spotId
    }
}

const DeleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

const AddImage = (image, spotId) => {
    return {
        type: ADD_IMAGE,
        image,
        spotId
    }
}

export const thunkAllSpots = (query) => async (dispatch) => {
    const res = await fetch(`/api/spots?${query}`);
    if (res.ok){
        const data = await res.json();
        dispatch(GetSpots(data.Spots))
    }
}

export const thunkGetCurrentSpots = () => async (dispatch) =>{
    const res = await fetch('/api/spots/current')
    if (res.ok) {
        const data = await res.json();
        dispatch(GetCurrentSpots(data.Spots))
    }
}

export const thunkGetOneSpot = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`)
    if (res.ok){
        const data = await res.json();
        dispatch(GetOneSpot(data))
        return res
    }
}

export const thunkAddSpotImage = (images, spotId) => async (dispatch) => {
    for (let image of images) {
        if (image) {
            const res = await csrfFetch(`/api/spots/${spotId}/images`, {
                method: 'POST',
                body: JSON.stringify(image)})
            if (res.ok) {
                const data = await res.json();
                dispatch(AddImage(data, spotId))
            }}}}
export const thunkCreateSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot.Spot)});
    if (res.ok) {
        const data = await res.json();
        await dispatch(CreateSpot(data))
        dispatch(thunkAddSpotImage(spot.Images, data.id))
        return data
    }
}
export const thunkDeleteSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'})
    if (res.ok){
        dispatch(DeleteSpot(spotId));}
}

export const thunkUpdateSpot = (spotId, spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify(spot.Spot)})
    if (res.ok) {
        const data = await res.json();
        await dispatch(UpdateSpot(data, spotId));
        return data
    }
    return res
}
const initialState = {}

const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SPOTS: {
            const newState = {...state, Spots: {}};
            action.spots.forEach(spot => {newState.Spots[spot.id] = spot})
            return newState
        }
        case CURRENT_SPOTS: {
            const newState = {...state, userSpots: {}};
            action.spots.forEach(spot => { newState.userSpots[spot.id] = spot})
            return newState
        }
        case GET_ONE_SPOT:{
            const newState = {...state, Spots: {}}
            newState.Spots = {...state.Spots, [action.spot.id]: action.spot}
            return newState
        }
        case CREATE_SPOT: {
            const newState = {...state, Spots: {[action.spot.id]: action.spot}}
            return newState
        }
        case ADD_IMAGE: {
            if (action.image.preview) {
                const newState = {...state}
                newState.Spots[action.spotId].previewImage = action.image.url;
                return newState
            }
            return state
        }
        case UPDATE_SPOT: {
            const newState = {...state}
            newState.Spots[action.spotId] = action.spot
            return newState
        }
        case DELETE_SPOT: {
            const newState = {...state, userSpots: state.userSpots}
            delete newState.userSpots[action.spotId]
            return newState
        }
        default:
            return state
    }
}

export default spotsReducer
