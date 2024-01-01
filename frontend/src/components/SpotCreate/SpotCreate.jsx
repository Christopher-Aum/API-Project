import { useEffect, useState } from 'react'
import { thunkCreateSpot, thunkUpdateSpot } from '../../store/spots';
import './SpotCreate.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateSpot({ isUpdate, formType }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const { spotId } = useParams()

    let spot;
    const spots = useSelector(state => state.spots.Spots)
    spot = spots && spots[spotId]

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [spotName, setSpotName] = useState('');
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')

    const [errors, setErrors] = useState({});
    useEffect(() => {
        if((spot.Owner.id && sessionUser.id != spot.Owner.id) || !sessionUser) navigate('/')
        if (spot && isUpdate) {
            setCity(spot.city || '')
            setState(spot.state || '')
            setAddress(spot.address || '')
            setCountry(spot.country || '')
            setSpotName(spot.name || '')
            setDescription(spot.description || '')
            setPrice(spot.price || '')
            setPreviewImage(spot.previewImage || '')
            setImage1(spot.SpotImages[1]?.url || '')
            setImage2(spot.SpotImages[2]?.url || '')
            setImage3(spot.SpotImages[3]?.url || '')
            setImage4(spot.SpotImages[4]?.url || '')
        }
    }, [spot, isUpdate, sessionUser, navigate])

    async function onSubmit(e) {
        e.preventDefault();
        setErrors({});
        const imageEndings = ['.png', '.jpg', '.jpeg']
        const newPreviewImage = {
            url: previewImage,
            preview: true
        }
        let newSpot = {
            Spot: {
                address,
                city,
                state,
                country,
                name: spotName,
                price,
                description
            },
            Images: [
                newPreviewImage,
                image1 && {url: image1, preview: false} || undefined,
                image2 && {url: image2, preview: false} || undefined,
                image3 && {url: image3, preview: false} || undefined,
                image4 && {url: image4, preview: false} || undefined
            ]
        }

        if (previewImage && imageEndings.some(ext => previewImage.endsWith(ext))){
            dispatch(formType ? thunkUpdateSpot(spot.id, newSpot) : thunkCreateSpot(newSpot))
                .then(spot => {navigate(`/spots/${spot.id}`)})
                .catch(async (res) => {
                    const data = await res.json();
                    if (data.errors) {
                        setErrors(data.errors)
                    }
                })
        } else {
            setErrors({...errors, preview: 'Preview image is required and must end in .png, .jpg or .jpeg'})
        }
    }
    function inputFormatter(className, type, placeholder, value, setValue, labelClass, pInput) {
        return (
            <label className={labelClass ? labelClass : ''}>
                {pInput && <p>{pInput}</p>}
                <input
                    className={className}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    /></label>
        )}
    function createImageInput() {
        const returnArr = []
        const images = [image1, image2, image3, image4]
        const setImage = [setImage1, setImage2, setImage3, setImage4]

        for (let i = 0; i < 4; i++) {
            returnArr.push((
                <label key={i}>
                    <input
                        className='PhotoInput'
                        type='url'
                        placeholder='Image URL'
                        value={images[i]}
                        onChange={(e) => setImage[i](e.target.value)}
                        /></label>
            ))}
        return returnArr
    }
    return (
        <>
        {sessionUser && <form className='NewSpot' onSubmit={onSubmit}>
                <h1 className='Header'>{formType ? 'Update your Spot' : 'Create a New Spot'}</h1>
                <h2 className='SubHeader'>Where&apos;s your place located?</h2>
                <p className='SubHeaderDetails'>Guests will only get your exact address once they booked a reservation.</p>
                {Object.values(errors).map(error => (
                    <p className='Errors' key={error}>{error}</p>
                ))}
                {inputFormatter('Input', 'text', 'Country', country, setCountry, 'Country PartOneInputs', 'Country')}
                {inputFormatter('Input', 'text', 'Street Address',  address, setAddress, 'StreetAddress PartOneInputs', 'Street Address')}
                <label className='CityAndState PartOneInputs'>
                    {inputFormatter('Input CityInput', 'text', 'City', city, setCity, 'NestedInputContainer', 'City')}
                    <p className='Comma'>,</p>
                    {inputFormatter('Input StateInput', 'text', 'State',state, setState, 'StateInputContainer', 'STATE')}</label>
                <label className='break' />
                <h2 className='SubHeader'>Describe your place to future guests</h2>
                <p className='SubHeaderDetails'>Mention the best features of your space, such as like fast wifi or parking, and what you love about the neighborhood.</p>
                <label className='TextContainer'>
                    <textarea
                        className='TextArea'
                        placeholder='Please write at least 30 characters'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        /></label>
                <label className='break' />
                <h2 className='SubHeader'>Create a title for your spot</h2>
                <p className='SubHeaderDetails'>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                {inputFormatter('Input', 'text', 'Name of your Spot', spotName, setSpotName)}
                <label className='break' />
                <h2 className='SubHeader'>Set a base price for your spot</h2>
                <p className='SubHeaderDetails'>Competitive pricing can help your listing stand out.</p>
                {inputFormatter('Input', 'text', 'Name of your spot (USD)',price, setPrice, 'PriceContainer', '$')}
                {!isUpdate &&
                <>
                    <label className='break' />
                    <h2 className='SubHeader'>Liven up your spot with photos</h2>
                    <p className='SubHeaderDetails'>Submit a link to at least one photo to publish your spot.</p>
                    {inputFormatter('PhotoInput', 'url', 'Preview Image Url', previewImage, setPreviewImage)}
                    {createImageInput()}
                </>}
                <label className='break' />
                <button className='Submit'>{isUpdate ? "Update Spot" : "Create Spot"}</button>
            </form>}
        </>
    )
}
