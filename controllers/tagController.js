const {Tag, News} = require('../models/models');
const ApiError = require('../error/ApiError');

class TagController {
    async create(req, res) {
        const {tag} = req.body;
        const name = await Tag.create({tag});
        return res.json(name)
    }

    async getAll(req, res) {
        const tags = await Tag.findAll();
        return res.json(tags)
    }

    async getAllTagPublications(req, res) {
        const id = req.params.id;
        const news = await Image.findAll({include: News, where: {publication_id: id}});
        return res.json(news)
    }
}

module.exports = new TagController();