import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { thunkGetCurrentSpots } from "../../store/spots";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useEffect } from "react";
import './ManageSpots.css'
import DeleteSpot from "../SpotDelete/SpotDelete";

export default function ManageSpots() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const spots = useSelector(state => state.spots)
    const allSpots = spots.userSpots && Object.values(spots.userSpots)

    useEffect(() => {
        if (!sessionUser) navigate('/');
        dispatch(thunkGetCurrentSpots())
    }, [dispatch, sessionUser, navigate])

    return (
        <>
            { sessionUser && <div className="Wrapper">
                <header className="Header">
                    <h1>Manage Your Spots</h1>
                    <button className='NewSpotBtn' onClick={() => navigate('/spots/new')}>Create a New Spot!</button>
                </header>
                <ul className="Spots">
                    {allSpots && Array.isArray(allSpots) && allSpots.map(spot => (
                        <li title={`${spot.name}`} className='spots manageSpotsWrapper' key={`${spot.id}`} >
                        <label className='Spots' onClick={() => navigate(`/spots/${spot.id}`)}>
                            <img className='previewImage' src={`${spot.previewImage}`} alt={`${spot.previewImage}`} />
                            <span className="Location">
                                   <p>{spot.city}, {spot.state}</p>
                                <p className='Stars'>
                                    {typeof spot.avgRating === 'number' && spot.avgRating.toFixed(1) || 'New'}</p>
                        </span>
                        <p className='Price'>${spot.price} per night</p>
                            </label>
                <div className="ButtonsContainer">
                    <button className="UpdateBtn" onClick={() => navigate(`/spots/${spot.id}/edit`)}>Update</button>
                        <label className='DeleteBtn'>
                        <p className="DeleteBtnText">Delete </p>
                                    <OpenModalButton modalComponent={<DeleteSpot spotId={spot.id}/>}/>
                                </label>
                            </div></li>))}
                </ul></div>}
        </>
    )}
