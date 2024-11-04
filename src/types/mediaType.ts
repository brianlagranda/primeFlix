export type Media = Movie | TVShow;

export type MediaCardProps = {
    media: Media;
};

export interface MediaGridProps {
    mediaList: Media[];
    loading: boolean;
    error: string | null;
    onLoadMore: () => void;
}

type Genre = {
    id: number;
    name: string;
};

export type MinimalMedia = {
    id: number;
    title: string;
    poster_path: string;
};

export type Movie = {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    imgURL: string;
    genres?: Genre[];
};

export type TVShow = {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
    imgURL: string;
    genres?: Genre[];
};
