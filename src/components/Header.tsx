import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../app/store';

import { clearToken } from '../features/auth/authSlice';
import { resetPage } from '../features/search/searchSlice';

import makeTransition from '../utils/makeTransition';

const Header = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navItems = [
        { label: 'Inicio', path: '/mediaList?content=all' },
        { label: 'Películas', path: '/mediaList?content=movie' },
        { label: 'Series', path: '/mediaList?content=tv' },
        { label: 'Favoritos', path: '/favourites' },
    ];

    const isLogged = token !== null;

    const handleLogout = () => {
        dispatch(clearToken());
        makeTransition(() => {
            navigate('/');
        });
    };

    const handleNavigation = (path: string) => {
        makeTransition(() => {
            navigate(path);
            dispatch(resetPage());
        });
    };

    return (
        <header className="flex h-14 items-center gap-4 bg-gradient-to-r from-black via-black via-40% to-cyan-800 p-4 text-white">
            <span
                aria-label="PrimeFlix homepage"
                className="cursor-pointer text-2xl font-bold"
                onClick={() =>
                    handleNavigation('/mediaList?content=movies-and-series')
                }
            >
                PrimeFlix
            </span>
            <nav className="flex w-full items-center justify-between md:text-lg">
                <ul className="flex gap-4 transition-all duration-300 ease-in-out">
                    {navItems.map((item) => (
                        <li
                            key={item.label}
                            className="cursor-pointer bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out visited:border-b-2 hover:bg-[length:100%_2px]"
                            onClick={() => handleNavigation(item.path)}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
                {isLogged && (
                    <button
                        className="ml-auto rounded bg-red-500 px-4 py-2 hover:bg-red-700"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                )}
            </nav>
        </header>
    );
};

export default Header;
