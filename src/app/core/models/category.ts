export interface CategoryDTO {
    id: number;
    slug: string;
    title: string;
    parent_id: number;
    created_at: number;
    updated_at: number;
}

export interface Category {
    id?: number;
    slug?: string;
    title?: string;
    parent_id?: number;
    created_at?: number;
    updated_at?: number;
    _selected?: boolean;
}