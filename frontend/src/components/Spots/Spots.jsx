import { useDispatch, useSelector } from "react-redux";
import { thunkAllSpots } from "../../store/spots";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams,useLocation } from "react-router-dom";


export default function AllSpots() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const spots = useSelector(state => state.spots.Spots)
    const allSpots = spots && Object.values(spots)
    const location = useLocation()
    const reset = location.state.reset
    const [searchparams] = useSearchParams()
    const [page, setPage] = useState(searchparams.get("page") || 1)
    const [size] = useState(searchparams.get("size")|| 20)

    useEffect(()=> {
        if(reset){dispatch(thunkAllSpots('page=1&size=20'))
        setPage(1)} else {
    dispatch(thunkAllSpots(`${page && `page=${page}`}${size ? `&size=${size}` : ''}`))}
    },[dispatch, reset, page, size])

    return (
        <div className="AllSpotsWrap">
            <ul className="SpotsWrap">
                {allSpots && Array.isArray(allSpots) && allSpots.map(spot => (
                    <li title={`${spot.name}`} className="Spots" key={`${spot.id}`} onClick={()=> navigate(`/spots/${spot.id}`)}>
                        <img className="PreviewImg" src={`${spot.previewImage}`}/>
                        <span className="Details">
                            <p>{spot.city},{spot.state}</p>
                            <p className="Stars">{typeof spot.avgRating === 'number' && spot.avgRating.toFixed(1) || 'New'}</p>
                        </span>
                        <p className="Price">${spot.price} night</p>
                    </li>))}
            </ul>
            <div className='PageButtonWrap'>
                <button className='PageButton' onClick={() => {
                    page > 1 && setPage(prevPage => prevPage - 1)
                    location.state.reset = false}}>
                        previous</button>
                <p className='PageNumber'>{page}</p>
                <button className='PageButton' onClick={() => {
                    allSpots.length == size && setPage(lastPage => lastPage += 1)
                    location.state.reset = false}}>
                        next</button>
            </div>
        </div>
    )}
