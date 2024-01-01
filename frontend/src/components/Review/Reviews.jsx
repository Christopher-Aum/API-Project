import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ReviewForm from "./ReviewForm";
import './Reviews.css'
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReview from "../ReviewDelete/ReviewDelete";
import { thunkGetReviews } from "../../store/review";

export default function Reviews ({ spotId, ownerId}) {
    const dispatch = useDispatch();
    let allReviews = useSelector(store => store?.reviews)
    const reviews = allReviews.Reviews !== undefined && Object.values(allReviews.Reviews)
    const sessionUser = useSelector((state) => state.session.user)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',' August', 'September', 'October', 'November', 'December']
    const userReview = reviews && reviews.find(review => review?.userId == sessionUser.id)
    const button = (!userReview && sessionUser && ownerId !== sessionUser.id)

    useEffect(() => {
        dispatch(thunkGetReviews(spotId));
    }, [dispatch, spotId])

    return (
    <div className='Review'>

        {   button &&
            <label className={reviews.length ? 'PostContainer' : 'PostContainer2'}>
                <p className={reviews.length ? 'PostText' : 'PostText2'}>{reviews.length ? 'Post Your Review' : 'Be the first to post a review'}</p>
                <OpenModalButton modalComponent={<ReviewForm spotId={spotId}/>} />
            </label>
        }
    <ul className="Review">
            { reviews && reviews.toReversed().map(review => {
            const month = review.updatedAt.split('-')[0];
            const year = review.updatedAt.split('-')[1];
                return (<li key={`${review.id}`} className='ReviewContainer'>
                    <h4 className='Name'>{review.userId == sessionUser.id ? sessionUser.firstName : review.User.firstName}</h4>
                    <p className="ReviewDate">Posted on: {months[month - 1]} {year}</p>
                    <p className='ReviewText'>{review.review}</p>{
                    review?.userId == sessionUser.id &&
                <label className="DeleteButton">
                    <p className="DeleteButtonText">Delete Review</p>
            <OpenModalButton modalComponent={<DeleteReview reviewId={review.id} spotId={spotId}/>} /></label>}</li>)})}
        </ul>
    </div>
    )
}
