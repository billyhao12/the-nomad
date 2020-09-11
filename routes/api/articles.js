const router = require('express').Router();
const articlesController = require('../../controllers/articlesController');
const passport = require('passport')

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


<<<<<<< HEAD
router.route('/category/:cat')
  .get(articlesController.findByCat)
=======
router.route('/categorySingle/:category')
  .get(articlesController.findByCategorySingle);

router.route('/categoryArray/:categories')
  .get(articlesController.findByCategoryArray);
>>>>>>> 5c08781f523f91d2ccb29698821a43e4d9dd0728
// Potentially make the comment a subroute of the article

module.exports = router;