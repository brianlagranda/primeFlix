import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../app/store';

import { incrementPage } from '../features/search/searchSlice';

import MediaGrid from './MediaGrid/MediaGrid';

import { useFetchMedia } from '../hooks/useFetchMedia';

const MediaList = () => {
    const dispatch = useDispatch();
    const page = useSelector((state: RootState) => state.search.page);
    const Token = sessionStorage.getItem('token');

    const { data: moviesList, loading, error } = useFetchMedia('', page);

    if (!Token) return <Navigate to="/" />;

    return (
        <MediaGrid
            mediaList={moviesList}
            loading={loading}
            error={error}
            onLoadMore={() => dispatch(incrementPage())}
        />
    );
};

export default MediaList;
