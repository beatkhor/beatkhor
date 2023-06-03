import { BehaviorSubject } from 'rxjs';

export interface Media {
    id: number;
    tag: string;
    uuid: string;
    path: string;
    name: string;
    size: string;
    storage_name: string;
    mime_type: string;
    parent_id: number;
    created_at: number;
    updated_at: number;

    // Just used in frontend
    _code: string;
    _parent: string;
}

export interface ID3Tags {
    title: string;
    artist: string;
    genre: string;
    album: string;
    year: string;
    comment: string;
}

export interface UpdateMediaPayload {
    name?: string;
    tag?: string;
    parent_id?: string;
}

export interface Audio {
    id?: number;
    created_at?: number;
    updated_at?: number;
    title: string;
    demo?: string;
    original: string;
    multi_track?: string;
    key_note?: string;
    bpm?: number;
    price?: number;
}

export interface Picture {
    id?: number;
    created_at?: number;
    updated_at?: number;
    thumbnail?: string;
    original: string;
    default?: string;
}

export interface MediaUploadDTO {
    file: File;
    upload: {
        upload: any,
        progress: BehaviorSubject<number>;
    };
    media?: Media;
}