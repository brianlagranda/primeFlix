import axios from 'axios';
import { Media } from '../types/mediaType';

const apiKey = import.meta.env.VITE_API_KEY;

export const fetchMoviesByQuery = async (
    searchQuery: string,
    queryParams: string,
    page: number,
): Promise<Media[]> => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&${queryParams}&page=${page}`;
    const response = await axios.get(url);
    return response.data.results || [];
};

export const fetchSeriesByQuery = async (
    searchQuery: string,
    queryParams: string,
    page: number,
): Promise<Media[]> => {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${searchQuery}&${queryParams}&page=${page}`;
    const response = await axios.get(url);
    return response.data.results || [];
};

export const fetchBothByQuery = async (
    searchQuery: string,
    queryParams: string,
    page: number,
): Promise<Media[]> => {
    const [moviesResponse, seriesResponse] = await Promise.all([
        fetchMoviesByQuery(searchQuery, queryParams, page),
        fetchSeriesByQuery(searchQuery, queryParams, page),
    ]);
    return [...moviesResponse, ...seriesResponse];
};

export const fetchMoviesByDiscovery = async (
    queryParams: string,
    page: number,
): Promise<Media[]> => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&${queryParams}&page=${page}`;
    const response = await axios.get(url);
    return response.data.results || [];
};

export const fetchSeriesByDiscovery = async (
    queryParams: string,
    page: number,
): Promise<Media[]> => {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&${queryParams}&page=${page}`;
    const response = await axios.get(url);
    return response.data.results || [];
};

export const fetchBothByDiscovery = async (
    queryParams: string,
    page: number,
): Promise<Media[]> => {
    const [movies, series] = await Promise.all([
        fetchMoviesByDiscovery(queryParams, page),
        fetchSeriesByDiscovery(queryParams, page),
    ]);
    return [...movies, ...series];
};
