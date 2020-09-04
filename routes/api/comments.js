const router = require('express').Router();
const commentsController = require('../../controllers/commentsController');
const passport = require("passport");

//Matches with "/api/comments"
router
  .route("/")
  .get(commentsController.findAll)
  .post(
    passport.authenticate("jwt", { session: false }),
    commentsController.create
  );

//Matches with "/api/posts/:id"
router
  .route('/:id')
  .get(commentsController.findById)
  .put(commentsController.update)
  .delete(commentsController.remove);

module.exports = router;