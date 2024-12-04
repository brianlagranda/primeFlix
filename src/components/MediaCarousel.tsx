import { useEffect, useState, useRef } from 'react';
import imageNotFound from '@/assets/NoImageFound.png';
import { Media, MediaCarouselProps } from '@/types/mediaType';
import MediaCard from './MediaCard';

const MediaCarousel: React.FC<MediaCarouselProps> = ({
    sectionTitle,
    fetchFunction,
}) => {
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchFunction();
                setMediaList(data);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [fetchFunction]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!carouselRef.current) return;
        isDragging.current = true;
        startX.current = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft.current = carouselRef.current.scrollLeft;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging.current || !carouselRef.current) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = x - startX.current;
        carouselRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUpOrLeave = () => {
        isDragging.current = false;
    };

    return (
        <div>
            <h2 className="mb-4 text-lg font-bold">{sectionTitle}</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div
                ref={carouselRef}
                className="scrollbar-hide grid auto-cols-[240px] grid-flow-col gap-4 overflow-x-auto whitespace-nowrap p-4"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
            >
                {mediaList.map((media) => (
                    <MediaCard media={media} />
                ))}
            </div>
        </div>
    );
};

export default MediaCarousel;
