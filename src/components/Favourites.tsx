import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { RootState } from '@/app/store';
import MediaGrid from './MediaGrid';

const Favourites = () => {
    const Token = sessionStorage.getItem('token');
    const favourites = useSelector(
        (state: RootState) => state.favourite.favourites,
    );

    const [visibleCount, setVisibleCount] = useState(20);

    if (!Token) return <Navigate to="/" />;

    const handleLoadMore = () => {
        setVisibleCount((prevCount) =>
            Math.min(prevCount + 20, favourites.length),
        );
    };

    const visibleFavourites = favourites.slice(0, visibleCount);
    const hasMoreItems = visibleCount < favourites.length;

    return (
        <MediaGrid
            mediaList={visibleFavourites}
            loading={false}
            error={null}
            onLoadMore={hasMoreItems ? handleLoadMore : undefined}
        />
    );
};

export default Favourites;
