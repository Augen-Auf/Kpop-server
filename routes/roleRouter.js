const Router = require('express');
const router = new Router();
const roleController = require('../controllers/roleController');

router.post('/', roleController.create);
router.get('/:id', roleController.getOne);
router.get('/', roleController.getAll);

module.exports = router;