import MediaCard from './MediaCard';
import LoadMoreButton from './LoadMoreButton';
import LoadingSpinner from './LoadingSpinner';

import { MediaGridProps } from '@/types/mediaType';
import { useLocation } from 'react-router-dom';

const MediaGrid: React.FC<MediaGridProps> = ({
    mediaList,
    loading,
    error,
    onLoadMore,
}) => {
    const location = useLocation();
    const pathname = location.pathname;

    if (error) {
        return (
            <div className="flex justify-center">
                <span>{error}</span>
            </div>
        );
    }

    return (
        <>
            {loading && <LoadingSpinner />}
            <div className={`px-8 ${pathname == '/favourites' ? 'mt-8' : ''}`}>
                {mediaList.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-4 xs:mx-auto xs:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4 xl:grid-cols-5">
                            {mediaList.map((media) => (
                                <MediaCard key={media.id} media={media} />
                            ))}
                        </div>
                        <div className="my-4 flex flex-col items-center justify-center">
                            {loading ? (
                                <LoadingSpinner data-testid="loading-spinner" />
                            ) : (
                                onLoadMore && (
                                    <LoadMoreButton
                                        onClick={onLoadMore}
                                        buttonTitle="Load More"
                                    />
                                )
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <span className="text-lg">
                            No se encontraron resultados
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};

export default MediaGrid;
