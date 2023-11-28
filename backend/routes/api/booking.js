const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { setTokenCookie, restoreUser, requireAuth, toAuthorize } = require('../../utils/auth');
const { handleValidationErrors, handleValidationErrorsNoTitle, handleBookings, ifExists } = require('../../utils/validation');
const { User, Review, Spot, ReviewImage, SpotImage, Booking, Sequelize } = require('../../db/models');

const router = express.Router();

const bookingValidator = [
check('endDate')
    .custom((value, {req}) => {
        let {startDate} = req.body
        let endDateString = new Date(value).toDateString();
        let startDateString = new Date(startDate).toDateString();
        let endDateTime = new Date(endDateString).getTime();
        let startDateTime = new Date(startDateString).getTime();
        return !(endDateTime <= startDateTime)
        })
        .withMessage(`endDate cannot be on or before startDate`),
        handleValidationErrorsNoTitle
];

const bookingConflicts = [
    check('endDate')
    .custom(async (value, { req }) => {
        const { bookingId } = req.params;
        const { user } = req;
        const bookingToBeEdited = await Booking.findByPk(bookingId);
        if(!bookingToBeEdited) return true
    const spot = await Spot.findByPk(bookingToBeEdited['spotId'])
        const allBookings = await Booking.findAll({
            where: {spotId: bookingToBeEdited['spotId']
            }
        });
        if(!allBookings.length || spot['ownerId'] == user.id || !spot){
            return true}
        let endDate = new Date(value).toDateString();
        endDate =  new Date(endDate).getTime();
        for (let booking of allBookings){
            if (booking['id'] == bookingId) continue;
            let bookStartDate = new Date(booking['startDate']).toDateString();
            bookStartDate = new Date(bookStartDate).getTime();
            let bookEndDate = new Date(booking['endDate']).toDateString();
            bookEndDate = new Date(bookEndDate).getTime();
            if(endDate >= bookStartDate && endDate <= bookEndDate){
                throw Error
            }}
        return true
    })
    .withMessage('End date conflicts with an existing booking'),
check('startDate')
    .custom(async (value, { req }) => {
        const { bookingId } = req.params;
        let { endDate } = req.body;
        const { user } = req;
        const bookingToBeEdited = await Booking.findByPk(bookingId);
        if (!bookingToBeEdited) return true
        const spot = await Spot.findByPk(bookingToBeEdited['spotId']);
        const allBookings = await Booking.findAll({
            where: {spotId: bookingToBeEdited['spotId']}
        });
        if(!allBookings.length || spot['ownerId'] == user.id){return true}
        let startDate = new Date(value).toDateString();
        startDate =  new Date(startDate).getTime();
        endDate = new Date(endDate).toDateString();
        endDate = new Date(endDate)
        for (let booking of allBookings){
            if (booking['id'] == bookingId) continue;
            let bookStartDate = new Date(booking['startDate']).toDateString();
            bookStartDate = new Date(bookStartDate).getTime();
            let bookEndDate = new Date(booking['endDate']).toDateString();
            bookEndDate = new Date(bookEndDate).getTime();
        if(startDate >= bookStartDate && startDate <= bookEndDate){
            throw Error
        }else if(startDate < bookStartDate && endDate > bookEndDate){
            throw Error
            }} return true
    })
    .withMessage('Start date conflicts with an existing booking'),
handleBookings
];

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const Bookings = await Booking.findAll({
        include: {model: Spot, attributes:{exclude: ['description','createdAt', 'updatedAt']}},
        exclude: ['spotId'],
        where: {
            userId: user.id
        }
    });
    const updatedBookings = []

    for (let booking of Bookings) {
        let previewImage = await SpotImage.findByPk(booking.Spot.id, {
            where: {preview: true}
        })


        if(previewImage) previewImage = previewImage.toJSON()

        if(previewImage) booking.Spot.previewImage = previewImage.url

        updatedBookings.push(booking)
    }

    res.json({Bookings: updatedBookings})
})

router.put('/:bookingId', [requireAuth, toAuthorize, ifExists, bookingValidator, bookingConflicts], async (req, res) => {
    const { bookingId } = req.params;
    let { startDate, endDate } = req.body;
    let booking = await Booking.findByPk(bookingId);

    await booking.update({
        startDate,
        endDate
    })


    res.json(booking)
});

router.delete('/:bookingId', [requireAuth, toAuthorize, ifExists], async (req, res) => {
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId);

    let startTime = booking['startDate'];

    startTime = new Date(startTime).toDateString();
    startTime = new Date(startTime).getTime();

    let currentDate = new Date().toDateString();
    currentDate = new Date(currentDate).getTime();
console.log(startTime)
console.log(currentDate)
    if (startTime < currentDate){
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    await booking.destroy();

    res.json({ message: "Successfully deleted"});
})

module.exports = router;
