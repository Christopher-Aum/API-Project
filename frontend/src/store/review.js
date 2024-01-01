import { csrfFetch } from "./csrf"
import { thunkGetOneSpot } from './spots'

const GET_REVIEWS = 'review/GET_REVIEWS'
const POST_REVIEW = 'review/POST_REVIEW'
const DELETE_REVIEW = 'review/DELETE_REVIEW'

const GetReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }}

const PostReview = (review) => {
    return {
        type: POST_REVIEW,
        review
    }}

const DeleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }}

export const thunkGetReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)
    if (res.ok){
        const data = await res.json();
        dispatch(GetReviews(data));
        return res;
    }}

export const thunkPostReview = (spotId, review) => async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`,{
            method: 'POST',
            body: JSON.stringify(review)})

        if (res.ok) {
            const data = await res.json();
            await dispatch(PostReview(data))
            dispatch (thunkGetOneSpot(spotId))}
        return res
}
export const thunkDeleteReview = (reviewId, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        await dispatch(DeleteReview(reviewId))
        dispatch(thunkGetOneSpot(spotId))
    }
}

const initialState = {}

const reviewsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = {...state, Reviews: {}}

            action.reviews.Reviews.map(review => {
                newState.Reviews[review.id] = review
            })

            return newState
        }
        case POST_REVIEW: {
            const newState = {...state, Reviews: {}}

            newState.Reviews = {...state.Reviews, [action.review.id]: action.review}

            return newState
        }
        case DELETE_REVIEW: {
            const newState = {...state}

            delete newState.Reviews[action.reviewId]

            return newState
        }
        default:
            return state
    }
}
export default reviewsReducer
