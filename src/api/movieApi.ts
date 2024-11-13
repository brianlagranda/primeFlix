import axios, { AxiosInstance } from 'axios';
import { Media, Movie, TVShow } from '../types/mediaType';

const apiKey = import.meta.env.VITE_API_KEY;
const apiBaseURL = 'https://api.themoviedb.org/3';

const apiClient: AxiosInstance = axios.create({
    baseURL: apiBaseURL,
    params: {
        api_key: apiKey,
    },
});

type QueryParams = {
    [key: string]: string | number | boolean | undefined;
};

const fetchData = async <T>(
    endpoint: string,
    queryParams: QueryParams = {},
): Promise<T> => {
    try {
        const response = await apiClient.get<T>(endpoint, {
            params: queryParams,
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
};

export const fetchMoviesByQuery = async (
    searchQuery: string,
    page: number = 1,
): Promise<Movie[]> => {
    const data = await fetchData<{ results: Movie[] }>('search/movie', {
        query: searchQuery,
        page,
    });
    return data.results;
};

export const fetchMoviesByDiscovery = async (
    page: number = 1,
): Promise<Movie[]> => {
    const data = await fetchData<{ results: Movie[] }>('discover/movie', {
        page,
    });
    return data.results;
};

export const fetchSeriesByQuery = async (
    searchQuery: string,
    page: number = 1,
): Promise<TVShow[]> => {
    const data = await fetchData<{ results: TVShow[] }>('search/tv', {
        query: searchQuery,
        page,
    });
    return data.results;
};

export const fetchSeriesByDiscovery = async (
    page: number = 1,
): Promise<TVShow[]> => {
    const data = await fetchData<{ results: TVShow[] }>('discover/tv', {
        page,
    });
    return data.results;
};

export const fetchBothByQuery = async (
    searchQuery: string,
    page: number = 1,
): Promise<Media[]> => {
    const [movies, series] = await Promise.all([
        fetchMoviesByQuery(searchQuery, page),
        fetchSeriesByQuery(searchQuery, page),
    ]);
    return [...movies, ...series];
};

export const fetchBothByDiscovery = async (
    page: number = 1,
): Promise<Media[]> => {
    const [movies, series] = await Promise.all([
        fetchMoviesByDiscovery(page),
        fetchSeriesByDiscovery(page),
    ]);
    return [...movies, ...series];
};
