const Router = require('express');
const router = new Router();
const avatarController = require('../controllers/avatarController');

router.get('/:id', avatarController.getOne);

module.exports = router;
