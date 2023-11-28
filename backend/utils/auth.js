// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(
      { data: safeUser },
      secret,
      { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax"
    });

    return token;
  };

  const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        return next();
      }

      try {
        const { id } = jwtPayload.data;
        req.user = await User.findByPk(id, {
          attributes: {
            include: ['email', 'createdAt', 'updatedAt']
          }
        });
      } catch (e) {
        res.clearCookie('token');
        return next();
      }

      if (!req.user) res.clearCookie('token');

      return next();
    });
  };

  // If there is no current user, return an error
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
  }

  const toAuthorize = async function (req, _res, next) {
    const { user } = req;
    const { reviewId, reviewImgId, bookingId, spotImgId, spotId } = req.params;
let errmsg;
    if (spotId) {
        const spot = await Spot.findByPk(spotId);
        if (!spot || user.id === spot['ownerId']) return next();
         errmsg = `Spot: Expected ${spot['ownerId']} but got ${user.id}`
    }

    if (reviewId) {
        const review = await Review.findByPk(reviewId);
        if(!review || user.id === review['userId']) return next();
        errmsg = `Review: Expected ${review['userId']} but got ${user.id}`
    }

    if (bookingId) {
        const booking = await Booking.findByPk(bookingId);
        if(!booking || user.id === booking['userId']) return next();
        errmsg = `Booking: Expected ${booking['userId']} but got ${user.id}`
    }

    if(reviewImgId){
        const reviewImg = await ReviewImage.findByPk(reviewImgId);

        if (!reviewImg) return next();

        const review = await Review.findByPk(reviewImg['reviewId'])

        if(user.id === review['userId']) return next()
        errmsg = `ReviewImg: Expected ${reviewImg['userId']} but got ${user.id}`
    }
    if(spotImgId){
        const spotImg = await SpotImage.findByPk(spotImgId);

        if (!spotImg) return next();

        const spot = await Spot.findByPk(spotImg['spotId'])

        if(user.id === spot['ownerId']) return next()
        errmsg = `SpotImg: Expected ${spotImg['userId']} but got ${user.id}`
    }

    const err = new Error('Forbidden');
    if (process.env.NODE_ENV !== "production"){
        err.title = 'Authentication required';
        err.errors = { message: 'Authentication required', errmsg };
    }
    err.status = 403;
    return next(err);
};

  module.exports = { setTokenCookie, restoreUser, requireAuth, toAuthorize};
