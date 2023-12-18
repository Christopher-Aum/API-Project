

const ALL_SPOTS = 'spots/ALL_SPOTS'
// const ONE_SPOT = 'spots/ONE_SPOT'
// const USER_SPOTS = "spots/USER_SPOTS"
// const CREATE_SPOT = 'spots/CREATE_SPOT'
// const ADD_SPOT_IMG= 'spots/ADD_SPOT_IMG'
// const UPDATE = 'spots/UPDATE'
// const DELETE = 'spots/DELETE'

const getAllSpots = (spots) => {
    return {
        type: ALL_SPOTS,
        spots
    }
}

// const getSingleSpot = (spot) => {
//     return {
//         type: ONE_SPOT,
//         spot
//     }
// }

// const getUserSpots = (spots) => {
//     return {
//         type: USER_SPOTS,
//         spots
//     }
// }

export const thunkAllSpots = (query) => async (dispatch) => {
    const response = await fetch(`/api/spots?${query}`)

    if(response.ok){
        const result = await response.json()
        dispatch(getAllSpots(result.Spots))
    }
}

const currentState = {}

const spotsReducer = (state = currentState, action) => {
    switch(action.type){
        case ALL_SPOTS: {
            const newState = {...state, Spots: {}}

            action.spots.forEach(spot => {
                newState.Spots[spot.id] = spot
            });

            return newState
        }
        default: return state
    }
}

export default spotsReducer
