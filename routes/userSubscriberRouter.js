const Router = require('express');
const router = new Router();
const userSubscriberController = require('../controllers/userSubscriberController');


router.post('/', userSubscriberController.create);
router.get('/subscribers/:id', userSubscriberController.getSubscribers);
router.get('/subscriptions/:id', userSubscriberController.getSubscriptions);
router.delete('/:id', userSubscriberController.unsubscribe);


module.exports = router;