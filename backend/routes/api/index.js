// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js')
const bookingRouter = require('./booking.js')
const reviewRouter = require('./reviews.js');
const reviewImgRouter = require('./reviewimg.js')
const spotImgRouter = require('./spotimg.js')
const { restoreUser } = require("../../utils/auth.js");


// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
  router.use(restoreUser);

  router.use('/session', sessionRouter);

  router.use('/bookings', bookingRouter);

  router.use('/reviews', reviewRouter);

  router.use('/spots', spotsRouter)

  router.use('/users', usersRouter);

  router.use('/review-images', reviewImgRouter)

  router.use('/spot-images', spotImgRouter)

  // router.post('/test', function(req, res) {
  //   console.log(`I'm being hit!`)
  //   res.json({ requestBody: req.body });
  // });


//   const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// const { restoreUser } = require('../../utils/auth.js');

// router.use(restoreUser);

// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


module.exports = router;
