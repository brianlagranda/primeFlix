import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Media } from '../types/mediaType';

const MySwal = withReactContent(Swal);

export const useFetchSingleMedia = (type: string, mediaID: string) => {
    const [data, setData] = useState<Media | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.themoviedb.org/3/${type}/${mediaID}?api_key=${apiKey}&language=es-ES`,
                );
                setData(response.data);
            } catch (e) {
                setError(
                    'Hubo un error inesperado, intente nuevamente más tarde',
                );
                MySwal.fire({
                    title: 'Hubo un error inesperado, intente nuevamente más tarde',
                    icon: 'error',
                });
                console.log(`Error: ${e}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, mediaID, apiKey]);

    return { data, loading, error };
};
