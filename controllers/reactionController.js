const { Reaction } = require('../models/models')

class ReactionController {
    async create(req, res) {
        const { emotion, publication_id, user_id } = req.body;
        const reaction = await Reaction.create({ emotion, publication_id, user_id });
        return res.json(reaction)
    }

    async update(req, res) {
        const id = req.params.id;
        const { emotion } = req.body;
        let Reaction = await Reaction.findByPk(id);
        Reaction.emotion = emotion;
        const new_reaction = await Reaction.save();
        return res.json(new_reaction)
    }

    async getUserReactionByPublication(req, res) {
        const { publication_id, user_id } = req.body;
        const reaction = await Reaction.findOne({where: {publication_id: publication_id, user_id: user_id}});
        return res.json(reaction)
    }

    async getAll(req, res) {
        const reactions = await Reaction.findAll();
        return res.json(reactions)
    }

    async delete(req, res) {
        const id = req.params.id;
        const result = await Reaction.destroy({where: {id: id}});
        return res.json(result)
    }

}

module.exports = new ReactionController();