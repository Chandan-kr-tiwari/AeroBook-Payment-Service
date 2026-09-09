class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async get(id) {
        return await this.model.findByPk(id);
    }

    async getAll() {
        return await this.model.findAll();
    }

    async update(id, data) {
        return await this.model.update(data, {
            where: {
                id
            }
        });
    }

    async destroy(id) {
        return await this.model.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = CrudRepository;