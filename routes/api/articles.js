const router = require('express').Router();
const articlesController = require('../../controllers/articlesController');
const passport = require("passport")

//Matches with "/api/articles"
router.route('/')
  .get(articlesController.findAll)
  .post(passport.authenticate('jwt', { session: false }), articlesController.create);

//Matches with"/api/articles/:id"
router
  .route('/:id')
  .get(articlesController.findById)
  .put(articlesController.update)
  .delete(articlesController.remove);

module.exports = router;