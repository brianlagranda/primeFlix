import { Navigate } from 'react-router-dom';
import MediaCarousel from './MediaCarousel';
import { fetchByDiscovery, fetchBothByDiscovery } from '@/api/mediaApi';

const MediaList = () => {
    const Token = sessionStorage.getItem('token');

    if (!Token) return <Navigate to="/" />;

    return (
        <div className="space-y-8 p-4">
            <MediaCarousel
                sectionTitle="Popular Movies"
                fetchFunction={() => fetchByDiscovery('movie')}
            />
            <MediaCarousel
                sectionTitle="Popular TV Shows"
                fetchFunction={() => fetchByDiscovery('tv')}
            />
            <MediaCarousel
                sectionTitle="Discover All"
                fetchFunction={fetchBothByDiscovery}
            />
        </div>
    );
};

export default MediaList;
