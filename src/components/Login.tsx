import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { setToken } from '@/features/auth/authSlice';

import makeTransition from '@/utils/makeTransition';

import { LoginProps } from '@/types/loginType';

const Login: React.FC<LoginProps> = () => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const Token = sessionStorage.getItem('token');

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        const regexEmail =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email === '' || password === '') {
            MySwal.fire({
                title: 'Los campos no pueden estar vacíos.',
                icon: 'warning',
            });
            return;
        }

        if (email !== '' && !regexEmail.test(email)) {
            MySwal.fire({
                title: 'Debes escribir una dirección de correo electrónico válido.',
                icon: 'error',
            });
            return;
        }

        if (email !== 'test@test.com' || password !== 'test') {
            MySwal.fire({
                title: 'Credenciales inválidas.',
                icon: 'error',
            });
            return;
        }

        const array = new Uint8Array(32);
        window.crypto.getRandomValues(array);
        const tokenData = Array.from(array, (byte) =>
            byte.toString(16).padStart(2, '0'),
        ).join('');

        sessionStorage.setItem('token', tokenData);
        dispatch(setToken(tokenData));
        makeTransition(() => {
            navigate('/mediaList');
        });
    };

    return (
        <>
            {Token && <Navigate to="/mediaList" />}

            <div className="mx-auto my-48 flex h-96 flex-col items-center justify-center gap-8 rounded-lg bg-gradient-to-r from-black via-black via-30% to-cyan-800 p-6 text-white shadow-2xl shadow-black sm:w-3/4 md:w-2/4 lg:w-1/3">
                <h2 className="text-4xl">Inicia sesión</h2>
                <form onSubmit={submitHandler} className="flex w-full flex-col">
                    <label>
                        <span className="">Email</span>
                        <br />
                        <input
                            className="h-8 w-full rounded p-2 text-black outline-black"
                            type="email"
                            name="email"
                        ></input>
                    </label>
                    <br />
                    <label>
                        <span className="">Contraseña</span>
                        <br />
                        <input
                            className="h-8 w-full rounded p-2 text-black outline-black"
                            type="password"
                            name="password"
                        ></input>
                    </label>
                    <br />
                    <button
                        className="mx-auto h-8 w-1/3 rounded border-2 border-white transition-colors duration-300 hover:bg-white hover:font-bold hover:text-black"
                        type="submit"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
