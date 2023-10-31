const express = require('express')
const bcrypt = require('bcryptjs')
const { check } = require('express-validator')

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Sequelize } = require('../../db/models');

const router = express.Router();

const validBody = [
    check('address')
        .exists({ checkFalsy: true})
        .withMessage ('Street address is required'),
    check('city')
        .exists({checkFalsy: true})
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true})
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .isFloat({
            max: 90,
            min: -90
        })
        .withMessage('Latitude is not valid'),
    check('lng')
        .isFloat({
            max: 180,
            min: -180
        })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .isFloat({
            min: 1
        })
        .withMessage('Price per day is required'),
        handleValidationErrors
]

router.get('/', async (_req, res) => {
    let spots = await Spot.findAll();

    const updatedSpots = []

    for (let spot of spots) {
        const stars = await Review.sum('stars', {
            where: { spotId: spot.id}
        })
        const numOfReviews = await Review.count({
            where: { spotId: spot.id}
        })

        let url = await SpotImage.findOne({
            attributes: ['url'], where: {spotId: spot.id}
        });

        avgRating = stars / numOfReviews

        spot = spot.toJSON()
        if(url) url = url.toJSON()

        spot.avgRating = avgRating
        if(url) spot.previewImage = url.url

        updatedSpots.push(spot)
        // spot.dataValues.avgRating = avgRating
        // spot.dataValues.previewImage = url.dataValues.url
    }

    return res.json({Spots: updatedSpots})
});

router.post('/', [requireAuth, validBody], async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { user } = req

    const newSpot = await Spot.create({
        "ownerId": user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.status(201)
    res.json(newSpot)
});

module.exports = router;
