import { Category } from './category';
import { Genre } from './genres';
import { Tag } from './tags';

export interface SearchPostFilters {
    genres?: Genre[];
    tags?: Tag[];
    categories?: Category[];
    query?: string;
    pageSize?: number;
    page?: number;
}