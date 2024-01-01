import { useDispatch } from 'react-redux';
import './SpotDelete.css'
import { thunkDeleteSpot } from '../../store/spots';
import { useModal } from '../../context/Modal';

export default function DeleteSpot({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    async function onSubmit(e) {
        e.preventDefault();
        await dispatch(thunkDeleteSpot(spotId))
        .then(closeModal)
    }
    return (
        <>
            <form className="DeleteForm" onSubmit={onSubmit}>
                <h2 className='Header'>Confirm Delete</h2>
                <h3 className='SubHeader'>Are you sure you want to remove this spot from the listings?</h3>
                <button type='submit' className="YesDelete">Yes (Delete Spot)</button>
                <button type='button' onClick={() => closeModal()} className="NoDelete">No (Keep Spot)</button>
            </form>
        </>
    )
}
