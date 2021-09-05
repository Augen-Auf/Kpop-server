const { Avatar } = require('../models/models');
const ApiError = require('../error/ApiError');

class AvatarController {
    async getOne(req, res) {
        const id = req.params.id;
        const avatar = await Avatar.findByPk(id);
        return res.end(avatar.img)
    }
}

module.exports = new AvatarController();
