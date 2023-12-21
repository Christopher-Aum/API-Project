import { useDispatch, useSelector } from "react-redux";
import { thunkAllSpots } from "../../store/spots";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export default function AllSpots() {
    const dispatch = useDispatch
    const navigate = useNavigate()
    const spots = useSelector(state => state.spots.Spots)
    const allSpots = spots && Object.values(spots)

    // const [params] = useSearchParams

    // const [page, setPage] = useState(params.get("page") || 1)
    // const [size, setSize] = useState(params.get("size") || 20)

    // useEffect(()=> {

    // })

    return (
        <div className="allSpotsWrap">
            <ul className="spotsWrap">
                {allSpots && Array.isArray(allSpots) && allSpots.map(spot => (
                    <li title={`${spot.name}`} className="spots" key={`${spot.id}`} onClick={()=> navigate(`/spots/${spot.id}`)}>
                        <img className="previewImg" src={`${spot.previewImage}`}/>
                        <span className="spotDetails">
                            <p>{spot.city},{spot.state}</p>
                            <p className="stars">{spot.avgRating}</p>
                        </span>
                        <p>${spot.price} night</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
