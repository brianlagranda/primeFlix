import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingSpinner from './LoadingSpinner';

import genreColors from '../utils/genreColors';
import makeTransition from '../utils/makeTransition';

import { useFetchSingleMedia } from '../hooks/useFetchSingleMedia';
import { resetPage } from '../features/search/searchSlice';

const DetailedMedia = () => {
    const Token = sessionStorage.getItem('token');
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchParams = new URLSearchParams(location.search);
    const mediaID = searchParams.get('mediaID');

    const isMoviePath = searchParams.get('content');
    const mediaType = isMoviePath ? 'movie' : 'tv';

    const {
        data: media,
        loading,
        error,
    } = useFetchSingleMedia(mediaType, `${mediaID}`);

    if (!Token) return <Navigate to="/" />;

    if (loading) return <LoadingSpinner />;

    if (error) {
        return (
            <div className="flex justify-center">
                <span>{error}</span>
            </div>
        );
    }

    const handleNavigation = () => {
        makeTransition(() => {
            navigate(-1);
            dispatch(resetPage());
        });
    };

    return (
        <>
            <button
                className="absolute left-12 top-24 animate-bg-grow text-3xl"
                onClick={handleNavigation}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            {media && (
                <div className="h-fit animate-bg-grow lg:m-8 lg:mx-auto lg:grid lg:w-[80%] lg:grid-cols-[1fr_2fr] lg:grid-rows-[1fr_100%] lg:rounded-lg lg:shadow-xl lg:shadow-emerald-100 xl:mx-auto">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                        className="mx-auto xs:pt-4 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:rounded-lg lg:rounded-tr-none lg:pt-0"
                        alt={'title' in media ? media.title : media.name}
                    />
                    <h2 className="my-4 bg-cyan-800 p-4 text-center text-2xl font-bold text-white lg:col-start-2 lg:row-start-1 lg:mx-auto lg:my-0 lg:w-full lg:items-center lg:rounded-tr-lg lg:p-0">
                        {'title' in media ? media.title : media.name}
                    </h2>
                    <div className="flex flex-col gap-4 p-2 lg:col-start-2 lg:row-start-2 lg:p-4">
                        <h5>
                            <strong className="text-lg font-bold">
                                {'title' in media
                                    ? 'Fecha de estreno:'
                                    : 'Fecha de primera emisión:'}
                            </strong>{' '}
                            {'title' in media
                                ? media.release_date
                                : media.first_air_date}
                        </h5>
                        <p>
                            <strong className="text-lg">Reseña:</strong>{' '}
                            {media.overview}
                        </p>
                        <h5 className="text-lg font-bold">Géneros:</h5>
                        <ul className="flex w-full gap-2">
                            {media.genres?.map((genre) => (
                                <li
                                    key={genre.id}
                                    className={`w-fit rounded-full ${genreColors[genre.name] || 'bg-gray-500'} px-4 py-1 font-bold`}
                                >
                                    {genre.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailedMedia;
