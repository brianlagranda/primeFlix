import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

import {
    addFavourite,
    removeFavourite,
} from '../../features/favourites/favouritesSlice';

import { RootState } from '../../app/store';

import imageNotFound from '../../assets/NoImageFound.png';

import makeTransition from '../../utils/makeTransition';

import { Media, MediaCardProps, Movie } from '../../types/mediaType';

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

    const imgEndpoint = 'https://image.tmdb.org/t/p/w500/';
    const imageSrc = media.poster_path
        ? `${imgEndpoint}${media.poster_path}`
        : media.imgURL || imageNotFound;

    return (
        <div
            key={media.id}
            className={`relative grid w-full ${imageSrc === imageNotFound ? 'grid-rows-[2fr_1fr]' : 'grid-rows-[auto_1fr]'} rounded border transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-[1.05]`}
        >
            <button
                className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full border bg-white text-xl transition-colors duration-300 ease-in-out"
                onClick={handleFavClick}
                data-media-id={media.id}
            >
                <FontAwesomeIcon
                    icon={isFavourite ? faHeartSolid : faHeartRegular}
                    className={isFavourite ? 'text-red-500' : 'text-black'}
                />
            </button>

            <button onClick={() => handleNavigation(media.id)}>
                <img
                    src={imageSrc}
                    loading="lazy"
                    className={`h-full bg-[#ECECEC] ${imageSrc === imageNotFound ? 'object-contain' : 'object-fill'}`}
                    alt={isMovie(media) ? media.title : media.name}
                />
            </button>
            <div className="flex w-full flex-col justify-between gap-2 bg-white p-2">
                <h2 className="text-xl font-bold">
                    {isMovie(media) ? media.title : media.name}
                </h2>
                <p className="">{`${media.overview.substring(0, 80)}...`}</p>
                <button
                    onClick={() => handleNavigation(media.id)}
                    className="w-1/2 rounded border bg-black p-2 text-center text-white hover:border-black hover:bg-white hover:text-black xs:w-full"
                >
                    View detail
                </button>
            </div>
        </div>
    );
};

export default MediaCard;
