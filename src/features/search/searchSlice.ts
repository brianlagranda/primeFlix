import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
    keyword: string | null;
    page: number;
}

const initialState: SearchState = {
    keyword: null,
    page: 1,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setKeyword(state, action: PayloadAction<string | null>) {
            state.keyword = action.payload;
            state.page = 1;
        },
        incrementPage(state) {
            state.page += 1;
        },
        resetPage(state) {
            state.page = 1;
        },
    },
});

export const { setKeyword, incrementPage, resetPage } = searchSlice.actions;
export default searchSlice.reducer;
