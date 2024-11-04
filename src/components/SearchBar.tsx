import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { resetPage, setKeyword } from '../features/search/searchSlice';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import makeTransition from '../utils/makeTransition';

const MySwal = withReactContent(Swal);

const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearching, setIsSearching] = useState(false);

    const searchParams = new URLSearchParams(location.search);
    const contentType = searchParams.get('type') || 'movies';

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const keyword = e.currentTarget.keyword.value.trim();

        if (keyword.length === 0) {
            return MySwal.fire({
                title: 'Debes ingresar una palabra clave',
                icon: 'warning',
            });
        } else if (keyword.length < 4) {
            return MySwal.fire({
                title: 'Debes ingresar más de 3 caracteres',
                icon: 'warning',
            });
        } else {
            setIsSearching(true);

            dispatch(setKeyword(keyword));
            dispatch(resetPage());

            e.currentTarget.keyword.value = '';

            makeTransition(() => {
                navigate(`/results?type=${contentType}`);
                setIsSearching(false);
            });
        }
    };

    return (
        <form
            onSubmit={submitHandler}
            className="flex w-full flex-row items-center justify-center gap-2 px-8 py-8 xs:px-4"
        >
            <label className="w-full xs:w-1/2 lg:w-2/5 xl:w-3/12">
                <input
                    className="h-8 w-full rounded border p-2 text-black outline-black"
                    type="text"
                    name="keyword"
                    placeholder="¿Qué película o serie buscás?"
                    disabled={isSearching}
                />
            </label>
            <button
                className="h-8 rounded border border-white bg-black px-2 text-white hover:border hover:border-black hover:bg-white hover:font-bold hover:text-black active:bg-black/80 active:text-white"
                type="submit"
                disabled={isSearching}
            >
                {isSearching ? 'Buscando...' : 'Buscar'}
            </button>
        </form>
    );
};

export default SearchBar;
