import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../app/store';

import { incrementPage } from '../features/search/searchSlice';

import MediaGrid from './MediaGrid/MediaGrid';

import { useFetchMedia } from '../hooks/useFetchMedia';

const Results = () => {
    const dispatch = useDispatch();
    const keyword = useSelector((state: RootState) => state.search.keyword);
    const page = useSelector((state: RootState) => state.search.page);
    const Token = sessionStorage.getItem('token');

    const searchKeyword = keyword || '';

    const {
        data: contentList,
        loading,
        error,
    } = useFetchMedia(searchKeyword, page);

    if (!Token || !keyword) return <Navigate to="/" />;

    return (
        <MediaGrid
            mediaList={contentList}
            loading={loading}
            error={error}
            onLoadMore={() => dispatch(incrementPage())}
        />
    );
};

export default Results;
