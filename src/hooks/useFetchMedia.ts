import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { filterDuplicates } from '../utils/filterHelpers';

import {
    fetchMoviesByQuery,
    fetchSeriesByQuery,
    fetchBothByQuery,
    fetchMoviesByDiscovery,
    fetchSeriesByDiscovery,
    fetchBothByDiscovery,
} from '../api/movieApi';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Media } from '../types/mediaType';

const MySwal = withReactContent(Swal);

export const useFetchMedia = (
    queryParams: string,
    searchQuery: string,
    page: number,
) => {
    const [data, setData] = useState<Media[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [prevMediaType, setPrevMediaType] = useState<string>('');
    const [mediaType, setMediaType] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const type = searchParams.get('content') || 'movie';
        setMediaType(type);
    }, [location.search]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                let fetchedData: Media[] = [];

                if (searchQuery) {
                    fetchedData = await fetchContentBasedOnQuery(
                        searchQuery,
                        queryParams,
                        page,
                        mediaType,
                    );
                } else {
                    fetchedData = await fetchContentByDiscovery(
                        queryParams,
                        page,
                        mediaType,
                    );
                }

                const filteredResults = filterDuplicates(data, fetchedData);

                if (mediaType !== prevMediaType || searchQuery) {
                    setData(filteredResults);
                    setPrevMediaType(mediaType);
                } else {
                    setData((prevData) => [...prevData, ...filteredResults]);
                }
            } catch (e) {
                handleError(e as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [mediaType, queryParams, page, searchQuery]);

    return { data, loading, error };
};

const fetchContentBasedOnQuery = async (
    searchQuery: string,
    queryParams: string,
    page: number,
    mediaType: string,
): Promise<Media[]> => {
    if (mediaType === 'movie') {
        return await fetchMoviesByQuery(searchQuery, queryParams, page);
    } else if (mediaType === 'tv') {
        return await fetchSeriesByQuery(searchQuery, queryParams, page);
    } else {
        return await fetchBothByQuery(searchQuery, queryParams, page);
    }
};

const fetchContentByDiscovery = async (
    queryParams: string,
    page: number,
    mediaType: string,
): Promise<Media[]> => {
    if (mediaType === 'movie') {
        return await fetchMoviesByDiscovery(queryParams, page);
    } else if (mediaType === 'tv') {
        return await fetchSeriesByDiscovery(queryParams, page);
    } else {
        return await fetchBothByDiscovery(queryParams, page);
    }
};

const handleError = (error: Error) => {
    MySwal.fire({
        title: 'Hubo un error inesperado, intente nuevamente más tarde',
        icon: 'error',
    });
    console.error(`Error: ${error.message}`);
};
