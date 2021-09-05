const { NewsTag } = require('../models/models');

class NewsTagController {
    async create(req, res) {
        const {tag_id, publication_id} = req.body;
        const newsTag = await NewsTag.create({tag_id, publication_id});
        return res.json(newsTag)
    }

    async delete(req, res)
    {
        const id = req.params.id;
        const result = await NewsTag.destroy({where: {id: id}});
        return res.json(result)
    }

}

module.exports = new NewsTagController();