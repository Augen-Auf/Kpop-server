const {Viki, Image, User} = require('../models/models');
const ApiError = require('../error/ApiError');

class VikiController {
    async create(req, res) {
        const {author_id, name, short_description, birthday, info} = req.body;
        const image = req.files && req.files.image ? req.files.image.data : null
        let newImageId = null
        if(image) {
            newImageId = await Image.create({image}).then(r => r.id)
        }
        const newViki = await Viki.create({author_id, name, short_description, birthday, info, image_id:newImageId})
        return res.json(newViki)
    }
    async update(req, res) {
        const id = req.params.id;
        const {name, short_description, birthday, info} = req.body;
        const image = req.files && req.files.image ? req.files.image.data : null
        const viki = await Viki.findOne({where: {id:id}});
        const curImage = await Image.findOne({where: {id: viki.image_id}});
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

        const new_viki = await viki.update({name, short_description, birthday, info, image_id:newImageId});

        return res.json(new_viki)
    }

    async getOne(req, res) {
        const id = req.params.id;
        const viki = await Viki.findOne({where: {id:id}, include: {model: User, attributes:['id', 'name']}});
        return res.json(viki)
    }

    async getAll(req, res) {
        const vikis = await Viki.findAll();
        return res.json(vikis)
    }

    async delete(req, res) {
        const id = req.params.id;
        const result = await Viki.destroy({where: {id: id}})
        return res.json(result)
    }

}

module.exports = new VikiController();
