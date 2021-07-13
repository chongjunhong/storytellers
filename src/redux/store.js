import { configureStore } from '@reduxjs/toolkit';
import story from './story';
import author from './author';
import errors from './errors';

export default configureStore({
  reducer: {
    story,
    author,
    errors,
  },
});
