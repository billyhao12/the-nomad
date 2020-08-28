const router = require ('express').Router();
const articleRoutes = require('./articles');
// const commentRoutes = require('./comments');
// const profileRoutes = require('./profiles');

// Article Routes
router.use('/articles', articleRoutes);

// // Comment Routes
// router.use('/comments', commentRoutes);

// // Profile Routes
// router.use('/profiles', profileRoutes);

module.exports = router;