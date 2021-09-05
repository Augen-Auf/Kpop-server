const Router = require('express');
const router = new Router();
const newsTagController = require('../controllers/newsTagController');


router.post('/', newsTagController.create);
router.get('/:id', newsTagController.delete);

module.exports = router;