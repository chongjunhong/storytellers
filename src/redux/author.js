import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import {saveStory, createInvite} from './story';
import omit from 'lodash/omit';
import {setError} from './errors';
import {MODEL_TYPES, DOMAIN_PORT} from '../constants';

const authorSlice = createSlice({
    name: 'author',
    initialState: {
        id: null,
        email: '',
        firstName: '',
        lastName: '',
        isVerified: false,
        accessToken: '',
        idToken: '',
    },
    reducers: {
        setAuthor: (state, {payload}) => {
            state.id = payload.id;
            state.email = payload.email;
            state.firstName = payload.firstName;
            state.lastName = payload.lastName;
            state.isVerified = payload.isVerified;
            state.accessToken = payload.accessToken;
            state.idToken = payload.idToken;
        },
        reset: (state) => {
            state.id = null;
            state.email = '';
            state.firstName = '';
            state.lastName = '';
            state.isVerified = false;
            state.accessToken = '';
            state.idToken = '';
        }
    },
});

export const {setAuthor, reset} = authorSlice.actions;

export const isAuthorLoggedIn = (state) => state.author.id !== null;
export const getAuthor = (state) => ({id: state.author.id});
export const getName = (state) => `${state.author.firstName} ${state.author.lastName}`.trim();
export const getUserId = (state) => state.author.id;
export const getIdToken = (state) => state.author.idToken;
export const getEmail = (state) => state.author.email;

export default authorSlice.reducer;