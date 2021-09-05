const { Role } = require('../models/models');

class RoleController {

    async create(req, res) {
        const { id, role, crud_access, moderate_access} = req.body;
        const role_obj = await Role.create({ id, role, crud_access, moderate_access});
        return res.json(role_obj)
    }
    
    async getOne(req, res) {
        const id = req.params.id;
        const role = await Role.findByPk(id);
        return res.json(role)
    }

    async getAll(req, res) {
        const roles = await Role.findAll();
        return res.json(roles)
    }
    
}

module.exports = new RoleController();