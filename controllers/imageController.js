const {Image} = require('../models/models');
const ApiError = require('../error/ApiError');

class ImageController {
    async getOne(req, res) {
        const id = req.params.id;
        const imageObj = await Image.findByPk(id);
        return res.end(imageObj.image)
    }

}

module.exports = new ImageController();
