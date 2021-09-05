const Router = require('express');
const router = new Router();
const savedNewsController = require('../controllers/savedNewsController');


router.post('/', savedNewsController.create);
router.get('/news/:id', savedNewsController.getSavedNews);
router.delete('/:id', savedNewsController.unsave);

module.exports = router;