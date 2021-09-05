const Router = require('express');
const router = new Router();
const vikiController = require('../controllers/vikiController');


router.post('/', vikiController.create);
router.get('/:id', vikiController.getOne);
router.get('/', vikiController.getAll);
router.put('/:id', vikiController.update);
router.delete('/:id', vikiController.delete);

module.exports = router;