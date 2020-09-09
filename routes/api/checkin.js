const router = require('express').Router();
const checkinController = require('../../controllers/checkinController');
const passport = require('passport');

//Matches with "api/checkins"
router
  .route('/')
  .get(checkinController.findAll)
  .post(
    passport.authenticate('jwt', { session: false}),
    checkinController.create
  );

router
  .route('/:id')
  .get(checkinController.findById)
  .put(checkinController.update)
  .delete(checkinController.remove);

module.exports = router;