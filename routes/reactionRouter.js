const Router = require('express');
const router = new Router();
const reactionController = require('../controllers/reactionController');


router.post('/', reactionController.create);
router.get('/', reactionController.getAll);
router.delete('/:id', reactionController.delete);
router.put('/:id', reactionController.update);
router.post('/user', reactionController.getUserReactionByPublication);


module.exports = router;