export default class Manager {
    constructor(model, populate) {
        this.model = model;
        this.populate = populate;
    }

    async findAll() {
        return this.model.find().populate(this.populate).lean();
    }

    async findById(id) {
        return this.model.findById(id).populate(this.populate).lean();
    }

    async createOne(obj) {
        return this.model.create(obj);
    }

    async updateOne(id, obj) {
        return this.model.updateOne({ _id: id }, { ...obj });
    }

    async deleteOne(id) {
        return this.model.deleteOne({ _id: id });
    }
}