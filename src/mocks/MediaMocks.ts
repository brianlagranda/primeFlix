import { Media } from '../types/mediaType';

export const mockMovie: Media = {
    id: 1,
    title: 'Sample Movie',
    poster_path: '/sample-poster.jpg',
    backdrop_path: '/sample-backdrop.jpg',
    genre_ids: [1, 2],
    original_language: 'en',
    original_title: 'Sample Original Title',
    overview: 'This is a sample movie overview.',
    popularity: 100,
    release_date: '2024-10-24',
    vote_average: 8.5,
    vote_count: 1000,
    imgURL: 'https://image.tmdb.org/t/p/w500/sample-poster.jpg',
    video: false,
};

export const mockTVShow: Media = {
    id: 2,
    name: 'Sample TV Show',
    poster_path: '/sample-poster-tv.jpg',
    backdrop_path: '/sample-backdrop-tv.jpg',
    genre_ids: [1, 3],
    original_language: 'en',
    original_name: 'Sample Original TV Name',
    overview: 'This is a sample TV show overview.',
    popularity: 200,
    first_air_date: '2023-01-01',
    vote_average: 7.8,
    vote_count: 500,
    imgURL: 'https://image.tmdb.org/t/p/w500/sample-poster-tv.jpg',
    origin_country: ['usa'],
};
