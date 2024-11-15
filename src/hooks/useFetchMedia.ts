import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { filterDuplicates } from '../utils/filterHelpers';
import {
    fetchByQuery,
    fetchBothByQuery,
    fetchByDiscovery,
    fetchBothByDiscovery,
} from '../api/movieApi';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Media } from '../types/mediaType';

const MySwal = withReactContent(Swal);

type MediaType = 'movie' | 'tv' | 'all';

const isValidMediaType = (type: string): type is MediaType =>
    type === 'movie' || type === 'tv' || type === 'all';

export const useFetchMedia = (searchQuery: string, page: number) => {
    const [data, setData] = useState<Media[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [mediaType, setMediaType] = useState<MediaType>('all');
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const type = searchParams.get('content') || 'all';
        if (isValidMediaType(type)) {
            setMediaType(type);
        } else {
            console.warn(`Invalid media type: ${type}`);
            setMediaType('movie');
        }
    }, [location.search]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                setData([]);

                const fetchedData = await fetchContent(
                    searchQuery,
                    page,
                    mediaType,
                );

                const newResults = filterDuplicates([], fetchedData);

                setData(newResults);
            } catch (e) {
                handleError(e as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [mediaType, page, searchQuery]);

    return { data, loading, error };
};

const fetchContent = async (
    searchQuery: string,
    page: number,
    mediaType: MediaType,
): Promise<Media[]> => {
    if (searchQuery) {
        return mediaType === 'all'
            ? fetchBothByQuery(searchQuery, page)
            : fetchByQuery(mediaType, searchQuery, page);
    } else {
        return mediaType === 'all'
            ? fetchBothByDiscovery(page)
            : fetchByDiscovery(mediaType, page);
    }
};

const handleError = (error: Error) => {
    MySwal.fire({
        title: 'Hubo un error inesperado, intente nuevamente más tarde',
        icon: 'error',
    });
    console.error(`Error: ${error.message}`);
};
