import { configureStore } from '@reduxjs/toolkit';
import favouriteReducer from '../features/favourites/favouritesSlice';
import authReducer from '../features/auth/authSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        favourite: favouriteReducer,
        search: searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
