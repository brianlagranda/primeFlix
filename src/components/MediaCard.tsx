import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

import {
    addFavourite,
    removeFavourite,
} from '@/features/favourites/favouritesSlice';

import { RootState } from '@/app/store';

import imageNotFound from '@/assets/NoImageFound.png';

import makeTransition from '@/utils/makeTransition';

import { Media, MediaCardProps, Movie } from '@/types/mediaType';

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
    const isMovie = (media: Media): media is Movie => {
        return (media as Movie).title !== undefined;
    };
    const dispatch = useDispatch();
    const favourites = useSelector(
        (state: RootState) => state.favourite.favourites,
    );
    const navigate = useNavigate();

    const isFavourite = favourites.some((fav) => fav.id === media.id);

    const handleFavClick = () => {
        if (isFavourite) {
            dispatch(removeFavourite(media));
        } else {
            dispatch(addFavourite(media));
        }
    };

    const handleNavigation = (mediaId: number) => {
        makeTransition(() => {
            navigate(
                `/detailedMedia?mediaID=${mediaId}&content=${isMovie(media) ? 'movie' : 'tv'}`,
            );
        });
    };

    const imgEndpoint = 'https://image.tmdb.org/t/p/w342/';
    const imageSrc = media.poster_path
        ? `${imgEndpoint}${media.poster_path}`
        : media.imgURL || imageNotFound;

    return (
        <div
            key={media.id}
            className="aspect-h-9 aspect-w-6 overflow-hidden rounded bg-[#ECECEC] transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-[1.05]"
            onClick={() => handleNavigation(media.id)}
        >
            <img
                src={imageSrc}
                loading="lazy"
                className="object-cover"
                alt={isMovie(media) ? media.title : media.name}
                draggable={false}
            />
        </div>
    );
};

export default MediaCard;
