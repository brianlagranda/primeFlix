import { createSlice } from '@reduxjs/toolkit';
import { Media } from '@/types/mediaType';

export type FavouritesState = {
    favourites: Media[];
};

const initialState: FavouritesState = {
    favourites: JSON.parse(localStorage.getItem('favs') || '[]'),
};

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addFavourite: (state, action) => {
            state.favourites.push(action.payload);
            localStorage.setItem('favs', JSON.stringify(state.favourites));
        },
        removeFavourite: (state, action) => {
            state.favourites = state.favourites.filter(
                (media) => media.id !== action.payload.id,
            );
            localStorage.setItem('favs', JSON.stringify(state.favourites));
        },
    },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
