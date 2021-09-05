const Router = require('express');
const router = new Router();
const newsController = require('../controllers/newsController');


router.post('/', newsController.create);
router.get('/:id', newsController.getOne);
router.get('/', newsController.getAll);
router.get('/:id/publications', newsController.getAllPublicationReactions);
router.get('/:id/comments', newsController.getAllPublicationComments);
router.get('/:id/images', newsController.getAllPublicationImages);
router.get('/:id/tags', newsController.getAllPublicationTags);
router.put('/:id', newsController.update);
router.delete('/:id', newsController.delete);

router.get('/:id/reactions', newsController.getNewsReactions)
router.post('/:id/reactions', newsController.setNewsReaction)

module.exports = router;
