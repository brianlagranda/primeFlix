import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MediaList from './components/MediaList';
import Login from './components/Login';
import Results from './components/Results';
import SearchBar from './components/SearchBar';
import Favourites from './components/Favourites';
import DetailedMedia from './components/DetailedMedia';

function App() {
    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
            }}
        >
            <div className="h-full select-none">
                <Header />

                <Routes>
                    <Route
                        path="/"
                        element={<Login target={''} email={''} password={''} />}
                    />
                    <Route
                        path="/mediaList"
                        element={
                            <>
                                <SearchBar />
                                <MediaList />
                            </>
                        }
                    />
                    <Route path="/detailedMedia" element={<DetailedMedia />} />
                    <Route
                        path="/results"
                        element={
                            <>
                                <SearchBar />
                                <Results />
                            </>
                        }
                    />
                    <Route path="/favourites" element={<Favourites />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
