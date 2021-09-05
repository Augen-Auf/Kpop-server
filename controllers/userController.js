const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Avatar, News, Comment, Viki} = require('../models/models');
const { Op } = require("sequelize");

const generateJwt = (id, email, name, role_id, avatarId) => {
    return jwt.sign(
        {id, email, name, role_id, avatarId},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
};

class UserController {
    async registration(req, res, next) {
        const {email, name, password, role_id} = req.body;
        if(!email || !name || !password) {
            return next(ApiError.badRequest('Некорректный email, name или password'))
        }
        const candidate = await User.findOne({ where: { [Op.or]: [{email}, {name}] }});
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email или name уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, name, password: hashPassword, role_id});
        const token = generateJwt(user.id, user.email, user.name, user.role_id, user.avatarId);
        return res.json({token})
    };

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user) {
            return next(ApiError.internal('Неверный email или пароль'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword) {
            return next(ApiError.internal('Неверный email или пароль'))
        }
        const token = generateJwt(user.id, user.email, user.name, user.role_id, user.avatarId);
        return res.json({token});
    };

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.name, req.user.role_id, req.user.avatarId);
        return res.json({token});
    }

    async updateUser(req, res, next) {
        const { userId, name, email, avatarAction } = req.body;

        if(!email || !name || !userId) {
            return next(ApiError.badRequest('Некорректный email или name'))
        }

        const user = await User.findOne({where: {id: userId}});

        const avatar = await Avatar.findOne({where: {id: user.avatarId}});
        let newAvatarId = avatar ? avatar.id : null
        const newAvatarImage = req.files

        if(newAvatarImage && newAvatarImage.img) {
            const {name: imageName, data} = newAvatarImage.img
            const newAvatar = avatar ? await avatar.update({
                    name: imageName,
                    img: data
                }) : await Avatar.create({name: imageName, img: data});
            newAvatarId = newAvatar.id
        }
        else {
            if(avatar && avatarAction === 'remove') {
                newAvatarId = null
                await avatar.destroy();
            }
        }

        const updatedUser = await user.update({name, email, avatarId: newAvatarId})
        const token = generateJwt(updatedUser.id, updatedUser.email, updatedUser.name, updatedUser.role_id, updatedUser.avatarId);

        return res.json({token})
    }

    async changePassword(req, res, next) {
        const {userId, oldPassword, newPassword} = req.body;

        const user = await User.findOne({where: {id: userId}});
        let comparePassword = bcrypt.compareSync(oldPassword, user.password);

        if(!comparePassword) {
            return next(ApiError.internal('Старый пароль не корректен'))
        }
        const hashNewPassword = await bcrypt.hash(newPassword, 5);

        await user.update({
            password: hashNewPassword
        })
        return res.json({update: 'success'})
    }

    async getUserNews(req, res, next) {
        const { userId } = req.body
        const news = await News.findAll({where: {author_id: userId, type:'news'}})
        return res.json(news)
    }

    async getUserComments(req, res, next) {
        const { userId } = req.body
        const comments = await Comment.findAll({where: {user_id: userId}, include: News})
        return res.json(comments)
    }

    async getUserArticles(req, res, next) {
        const { userId } = req.body
        const articles = await News.findAll({where: {author_id: userId, type:'articles'}})
        return res.json(articles)
    }

    async getUserVikis(req, res, next) {
        const { userId } = req.body
        const vikis = await Viki.findAll({where: {author_id: userId}})
        return res.json(vikis)
    }
}


module.exports = new UserController();
