import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';
import './index.css';

async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    const { worker } = await import('./mocks/browser.ts');

    return worker.start();
}

enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>,
    );
});
