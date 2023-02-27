"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const data_source_1 = require("../utils/data-source");
const post_entity_1 = require("../entities/post.entity");
const uuid_1 = require("uuid");
class PostController {
    constructor() {
        this.postRepository = data_source_1.AppDataSource.getRepository(post_entity_1.Post);
    }
    async all(request, response, next) {
        return this.postRepository.find();
    }
    async one(request, response, next) {
        const id = request.params.id;
        const post = await this.postRepository.findOne({
            where: { id }
        });
        if (!post) {
            return "unregistered post";
        }
        return post;
    }
    async save(request, response, next) {
        const { name, description } = request.body;
        const post = Object.assign(new post_entity_1.Post(), {
            id: (0, uuid_1.v4)(),
            name,
            description
        });
        return this.postRepository.save(post);
    }
    async update(request, response, next) {
        const { name, description } = request.body;
        const id = request.params.id;
        const post = await this.postRepository.findOne({
            where: { id }
        });
        post.name = name !== null && name !== void 0 ? name : post.name;
        post.description = description !== null && description !== void 0 ? description : post.description;
        return this.postRepository.save(post);
    }
    async remove(request, response, next) {
        const id = request.params.id;
        let postToRemove = await this.postRepository.findOneBy({ id });
        if (!postToRemove) {
            return "this post not exist";
        }
        await this.postRepository.remove(postToRemove);
        return "post has been removed";
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map