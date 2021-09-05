const Router = require('express');
const router = new Router();
const commentRouter = require('./commentRouter');
const imageRouter = require('./imageRouter');
const newsRouter = require('./newsRouter');
const newsTagRouter = require('./newsTagRouter');
const reactionRouter = require('./reactionRouter');
const roleRouter = require('./roleRouter');
const savedNewsRouter = require('./savedNewsRouter');
const tagRouter = require('./tagRouter');
const userRouter = require('./userRouter');
const avatarRouter = require('./avatarRouter');
const userSubscriberRouter = require('./userSubscriberRouter');
const vikiRouter = require('./vikiRouter');

router.use('/user', userRouter);
// router.use('/userSubscriber', userSubscriberRouter);
router.use('/comments', commentRouter);
router.use('/news', newsRouter);
router.use('/vikis', vikiRouter);
router.use('/tags', tagRouter);
router.use('/avatar', avatarRouter)
// router.use('/savedNews', savedNewsRouter);
// router.use('/role', roleRouter);
// router.use('/newsTag', newsTagRouter);
router.use('/images', imageRouter);
// router.use('/reaction', reactionRouter);

module.exports = router;
