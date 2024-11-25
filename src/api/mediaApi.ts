import axios, { AxiosInstance } from 'axios';
import { Media } from '@/types/mediaType';

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
            params: {
                ...queryParams,
                language: 'es-ES',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
};

export const fetchByQuery = async (
    type: 'movie' | 'tv',
    searchQuery: string,
    page: number = 1,
): Promise<Media[]> => {
    const data = await fetchData<{ results: Media[] }>(`search/${type}`, {
        query: searchQuery,
        page,
    });
    return data.results;
};

export const fetchByDiscovery = async (
    type: 'movie' | 'tv',
    page: number = 1,
): Promise<Media[]> => {
    const endpoint = `discover/${type}`;
    const data = await fetchData<{ results: Media[] }>(endpoint, { page });
    return data.results;
};

export const fetchBothByQuery = async (
    searchQuery: string,
    page: number = 1,
): Promise<Media[]> => {
    const [movies, series] = await Promise.all([
        fetchByQuery('movie', searchQuery, page),
        fetchByQuery('tv', searchQuery, page),
    ]);
    return [...movies, ...series];
};

export const fetchBothByDiscovery = async (
    page: number = 1,
): Promise<Media[]> => {
    const [movies, series] = await Promise.all([
        fetchByDiscovery('movie', page),
        fetchByDiscovery('tv', page),
    ]);
    return [...movies, ...series];
};
