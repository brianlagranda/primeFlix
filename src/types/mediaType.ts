export type Media = Movie | TVShow;

export type MediaCardProps = {
    media: Media;
};

export interface MediaGridProps {
    mediaList: Media[];
    loading: boolean;
    error: string | null;
    onLoadMore: (() => void) | undefined;
}

export interface MediaCarouselProps {
    sectionTitle: string;
    fetchFunction: () => Promise<Media[]>;
}

type Genre = {
    id: number;
    name: string;
};

type BaseMedia = {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    imgURL: string;
    genres?: Genre[];
};

export type Movie = BaseMedia & {
    original_title: string;
    release_date: string;
    title: string;
    video: boolean;
};

export type TVShow = BaseMedia & {
    origin_country: string[];
    original_name: string;
    first_air_date: string;
    name: string;
};

export type MinimalMedia = {
    id: number;
    title: string;
    poster_path: string;
};
