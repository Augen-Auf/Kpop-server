const Router = require('express');
const router = new Router();
const imageController = require('../controllers/imageController');


router.get('/:id', imageController.getOne);


module.exports = router;
