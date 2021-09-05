const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/password/change', userController.changePassword);
router.post('/change', userController.updateUser);
router.post('/news', userController.getUserNews);
router.post('/vikis', userController.getUserVikis);
router.post('/comments', userController.getUserComments);
router.post('/articles', userController.getUserArticles);
router.get('/auth', authMiddleware, userController.check);

module.exports = router;
