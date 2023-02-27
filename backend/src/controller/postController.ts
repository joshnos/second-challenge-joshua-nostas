import { AppDataSource } from '../utils/data-source'
import { NextFunction, Request, Response } from "express"
import { Post } from "../entities/post.entity"
import { v4 as uuidv4 } from 'uuid';

export class PostController {

    private postRepository = AppDataSource.getRepository(Post);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.postRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        

        const post = await this.postRepository.findOne({
            where: { id }
        });

        if (!post) {
            return "unregistered post";
        }
        return post;
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, description } = request.body;

        const post = Object.assign(new Post(), {
            id: uuidv4(),
            name,
            description
        });

        return this.postRepository.save(post);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const { name, description } = request.body;
        const id = request.params.id;

        const post = await this.postRepository.findOne({
            where: { id }
        });

        post.name = name ?? post.name;
        post.description = description ?? post.description;

        return this.postRepository.save(post);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;

        let postToRemove = await this.postRepository.findOneBy({ id });

        if (!postToRemove) {
            return "this post not exist";
        }

        await this.postRepository.remove(postToRemove);

        return "post has been removed";
    }

}