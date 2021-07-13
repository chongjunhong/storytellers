import merge from 'lodash/merge';
import { createSlice } from '@reduxjs/toolkit';

const errorsSlice = createSlice({
    name: 'errors',
    initialState: {errorsByPage: {}},
    reducers: {
        setError: (state, {payload}) => {
            state.errorsByPage = merge({}, state.errorsByPage, {[payload.page]: payload.error});
        }
    },
});

export const {setError} = errorsSlice.actions;

export const getErrorByPage = (page) => (state) => state.errors.errorsByPage[page] || null;

export default errorsSlice.reducer;