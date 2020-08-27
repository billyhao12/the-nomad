const router = require('express').Router();
const commentsController = require('../../controllers/commentsController');

//Matches with "/api/comments"
router
  .route('/')
  .get(commentsController.findAll)
  .post(commentsController.create);


//matches with "/api/posts/:id"
router
  .route('/:id')
  .get(commentsController)
  .put(commentsController.update)
  .delete(commentsController.remove);

module.exports = router;