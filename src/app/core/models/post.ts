import { Audio, Picture } from './media';
import { Category } from './category';
import { Genre } from './genres';
import { Tag } from './tags';
import { User } from './user';

export interface PostMeta {
    id?: number;
    title: string;
    price: number;
    description: string;
    code: string;
    status: number;
    review_status: number;
    overridden_artist_name?: string;
}

export interface Post {
    id?: number;
    post_meta: PostMeta;
    genres: Genre[];
    categories: Category[];
    tags: Tag[];
    audios: Audio[];
    pictures: Picture[];
    created_at?: number;
    updated_at?: number;
    user?: User;
    link?: string;
}

export enum PostStatus {
    None = 1,
    Draft = 2,
    Published = 3
}

export enum PostReviewStatus {
    None = 1,
    Approved = 2,
    Rejected = 3,
}