const { UserSubscriber, User } = require('../models/models');

class UserSubscriberController {
    async create(req, res) {
        const {user_id, subscriber_id} = req.body;
        const userSubscriber = await UserSubscriber.create({user_id, subscriber_id});
        return res.json(userSubscriber)
    }

    async getSubscribers(req, res) {
        const user_id = req.params.id;
        const userSubscribers = await UserSubscriber.getAll({include:User, where: {user_id: user_id}});
        return res.json(userSubscribers)
    }
    async getSubscriptions(req, res) {
        const user_id = req.params.id;
        const userSubscribers = await UserSubscriber.getAll({include:User, where: {subscriber_id: user_id}});
        return res.json(userSubscribers)
    }

    async unsubscribe(req, res) {
        const subscription_id = req.params.id;
        const { user_id } = req.body;
        const result = await UserSubscriber.destroy({where: {user_id: subscription_id, subscriber_id: user_id }});
        return res.json(result)
    }
}

module.exports = new UserSubscriberController();