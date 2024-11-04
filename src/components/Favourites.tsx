import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../app/store';

import MediaGrid from './MediaGrid/MediaGrid';

const Favourites = () => {
    const Token = sessionStorage.getItem('token');
    const favourites = useSelector(
        (state: RootState) => state.favourite.favourites,
    );

    if (!Token) return <Navigate to="/" />;

    return (
        <MediaGrid
            mediaList={favourites}
            loading={false}
            error={null}
            onLoadMore={() => {}}
        />
    );
};

export default Favourites;
