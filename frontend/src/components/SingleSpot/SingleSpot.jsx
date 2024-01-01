import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import { thunkGetOneSpot } from '../../store/spots'
import Reviews from '../Review/Reviews'

export default function SingleSpot () {
    const {spotId} = useParams()
    const dispatch = useDispatch()
    const spots = useSelector(store => store.spots)
    const spot = spots.Spots !== undefined && spots.Spots[spotId]
    const spotImgs = spot && spot.SpotImages
    const previewImg = spotImgs && spotImgs.find(img => img.preview)
    let reviewTitle;

    useEffect(()=> {
        dispatch(thunkGetOneSpot(spotId))
    }, [dispatch, spotId])

reviewTitle= spot.numReviews > 1 ? 'Reviews' : 'Review'

    function ReviewFormat() {
        return (
            <>
                {typeof spot.avgRating == 'number' && spot.avgRating.toFixed(1) || 'New'} {spot.numReviews > 0 && <span>·</span>}  {spot.numReviews > 0 && <span>{spot?.numReviews}</span>}
                {<span> {spot.numReviews > 0 && reviewTitle} </span>}
            </>)}
    return (
        <>
        { spot &&
        <div className="Spot">
            <h1>{spot.name}</h1>
            <span className='Location'>{spot.city}, {spot.state}, {spot.country}</span>
            <div className='ImageWrapper'>
                <img className='PreviewImage' src={previewImg.url} alt={previewImg.url}/>
                <div className='ImageContainer'>
            <img className='Image' src={spotImgs[1].url} alt={spotImgs[1].url || 'No Image Available'}/>
            <img className='Image' src={spotImgs[2].url} alt={spotImgs[2].url || 'No Image Available'}/>
            <img className='Image' src={spotImgs[3].url} alt={spotImgs[3].url || "No Image Available"}/>
                <img className='Image' src={spotImgs[4].url} alt={spotImgs[4].url || 'No Image Available'}/></div></div>
            <div className='ReserveWrapper'>
                <div className='Description'>
                    <h2 className='Host'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p className='spotDescription'>{spot.description}</p></div>
                <div className='Reserve'>
                    <span className="ReserveHeader">
                    <h2>${spot.price} per night</h2>
                        <h3>{ReviewFormat()}</h3></span>
            <button className='ReserveBtn' onClick={() => alert('Feature not yet available!')}>RESERVE!</button>
                </div></div>
            <h2 className='ReviewHeader'>{ReviewFormat()}</h2>
            <Reviews spotId={spotId} ownerId={spot.ownerId}/></div>}
        </>)}
