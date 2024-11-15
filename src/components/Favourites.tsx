import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { RootState } from '../app/store';
import MediaGrid from './MediaGrid/MediaGrid';

const Favourites = () => {
    const Token = sessionStorage.getItem('token');
    const favourites = useSelector(
        (state: RootState) => state.favourite.favourites,
    );

    const [visibleCount, setVisibleCount] = useState(
        Math.min(favourites.length, 20),
    );

    useEffect(() => {
        setVisibleCount(Math.min(favourites.length, 20));
    }, [favourites]);

    if (!Token) return <Navigate to="/" />;

    const handleLoadMore = () => {
        setVisibleCount((prevCount) =>
            Math.min(prevCount + 20, favourites.length),
        );
    };

    const hasMoreItems = visibleCount < favourites.length;

    return (
        <MediaGrid
            mediaList={favourites.slice(0, visibleCount)}
            loading={false}
            error={null}
            onLoadMore={hasMoreItems ? handleLoadMore : undefined}
        />
    );
};

export default Favourites;
