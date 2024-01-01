import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { thunkPostReview } from '../../store/review';
import { useModal } from '../../context/Modal';
import './ReviewForm.css'
export default function ReviewFormModal ({ spotId }) {
    const dispatch = useDispatch();
    const [activeRating, setActiveRating] = useState(0)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const { closeModal } = useModal()
    const [errors, setErrors] = useState({})

    function createRating() {
        const returnArr = []
        for (let i = 1; i <= 5; i++) {
            returnArr.push(
                <div
                    className={activeRating >= i ? 'Filled' : 'Empty'}
                    onMouseEnter={() => setActiveRating(i)}
                    onClick={() => setRating(i)}
                    key={i}
                ></div>)}
        return returnArr}

    function handleSubmit (e) {
        e.preventDefault();
        setErrors({})
         dispatch(thunkPostReview(spotId, {review, stars: rating}))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data.message) {
                    setErrors(data)
                }})}
    return (
        <form className='ReviewForm' onSubmit={handleSubmit}>
            <h2 className='FormHeader'>How was your stay?</h2>
            {Object.values(errors).map(error => (
                <p className='errors' key={error}>{error}</p>))}
            <textarea
                className="TextArea"
                placeholder="Leave your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}/>
            <div className='StarRating' onMouseLeave={() => setActiveRating(rating)}>
                {createRating()}
                <h4 className='Stars'>Stars</h4></div>
            <button className='PostButton' disabled={review.length < 10 || !rating}>Submit Your Review</button>
        </form>)}
