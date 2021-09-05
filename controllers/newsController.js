const { News, Reaction, Comment, Image, Tag, NewsTag, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class NewsController {
    async create(req, res, next) {
        const {title, lid, text, type, author_id, tags} = req.body;
        if(!title || !lid || !text) {
            return next(ApiError.badRequest('Отсутсвует заголовок, лид или текст'))
        }

        const image = req.files && req.files.image ? req.files.image.data : null
        let newImageId = null

        if(image) {
            newImageId = await Image.create({image}).then(r => r.id)
        }

        const news = await News.create({title, lid, text, type, views: 1, author_id, image_id: newImageId});

        const tagsArray = tags ? tags.split(',').map(item => item.trim().toUpperCase()) : null
        if(tagsArray && tagsArray.length > 0)
        {
            for(const item of tagsArray)
            {
                let tag = await Tag.findOne({ where: { tag: item } });
                console.log(tag)
                if (!tag)
                    tag = await Tag.create({ tag: item });

                await NewsTag.create({publication_id: news.id, tag_id: tag.id});
            }
        }
        return res.json(news)
    }

    async update(req, res) {
        const id = req.params.id;
        let {title, lid, text, type, author_id, tags} = req.body;
        let news = await News.findByPk(id);
        const image = req.files && req.files.image ? req.files.image.data : null

        const curImage = await Image.findOne({where: {id: news.image_id}});
        let newImageId = curImage ? curImage.id : null
        if(image) {
            const newImage = curImage ? await curImage.update({image}) : await Image.create({image});
            newImageId = newImage.id
        }
        else {
            if(curImage)
            {
                await curImage.destroy()
                newImageId = null
            }
        }

        const new_news = await news.update({title, lid, text, type, author_id, image_id: newImageId});

        const newsTags = await NewsTag.findAll({where: {publication_id: id}, include: Tag})

        const tagsArray = tags ? tags.split(',').map(item => item.trim().toUpperCase()) : null

        if(tagsArray &&tagsArray.length > 0)
        {
            const curTagsArray = newsTags.map(item => item.tag.tag);
            const addTagsArray = tagsArray.filter(item => !curTagsArray.includes(item))
            const removeTagsArray = curTagsArray.filter(item => !tagsArray.includes(item))
            for (const item of addTagsArray)
            {
                let tag = await Tag.findOne({ where: { tag: item } });
                if (!tag)
                    tag = await Tag.create({ tag: item });

                await NewsTag.create({publication_id: news.id, tag_id: tag.id});
            }

            for (const item of removeTagsArray) {
                const tag = await Tag.findOne({ where: { tag: item } });
                const newTag = await NewsTag.findOne({where: {publication_id: id, tag_id: tag.id}})
                await newTag.destroy()
            }
        }
        else {
            if(newsTags && newsTags.length > 0) {
                for (const newsTag of newsTags) {
                    await newsTag.destroy()
                }
            }
        }

        return res.json(new_news)
    }

    async getOne(req, res) {
        const id = req.params.id;
        let news = await News.findOne({where:{id:id}, include:[
                {
                    model: User,
                    attributes: ['name', 'id']
                },
                {
                    model: Tag,
                    through: NewsTag
                }
            ]});
        news = await news.update({views: news.views + 1})
        return res.json({news})
    }

    async getAll(req, res) {
        const news = await News.findAll({ include:[
            {
                model: User,
                attributes: ['name', 'id']
            },
            {
                model: Comment,
            },
            {
                model: Tag,
                through: NewsTag
            }
        ]});
        return res.json(news)
    }

    async getNewsReactions(req, res) {
        const newsId = req.params.id
        const reactions = await Reaction.findAll({where: {publication_id: newsId}})
        return res.json(reactions)
    }

    async setNewsReaction(req, res) {
        const newsId = req.params.id
        const {userId, choice} = req.body;
        const newReaction = await Reaction.findOne({where: {publication_id: newsId, user_id: userId}})
            .then(async reaction => {
            if(reaction)
            {
                if(reaction.emotion === choice)
                    return await reaction.destroy()
                else
                    return await reaction.update({emotion: choice})
            }
            else {
                return await Reaction.create({publication_id: newsId, user_id: userId, emotion: choice})
            }
        })
        return res.json(newReaction)
    }

    async delete(req, res) {
        const id = req.params.id;
        const result = await News.destroy({where: {id: id}});
        return res.json(result)
    }

    async getAllPublicationReactions(req, res) {
        const id = req.params.id;
        const reactions = await Reaction.findAll({include: Reaction, where: {publication_id: id}});
        return res.json(reactions)
    }

    async getAllPublicationComments(req, res) {
        const id = req.params.id;
        const comments = await Comment.findAll({include: User, where: {publication_id: id}});
        return res.json(comments)
    }

    async getAllPublicationImages(req, res) {
        const id = req.params.id;
        const images = await Image.findAll({include: Image, where: {publication_id: id}});
        return res.json(images)
    }

    async getAllPublicationTags(req, res) {
        const id = req.params.id;
        const tags = await Tag.findAll({include: Tag, where: {publication_id: id}});
        return res.json(tags)
    }

}

module.exports = new NewsController();
