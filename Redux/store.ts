import {configureStore} from '@reduxjs/toolkit';
import bookMarkReducer from './BookMarkSlice';

import {combineReducers} from 'redux';

import {persistReducer} from 'redux-persist';

import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = combineReducers({
  counter: bookMarkReducer,
});

const persistConfig = {
  key: 'root',

  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,

  devTools: process.env.NODE_ENV !== 'production',

  middleware: [thunk],
});

export default store;

// export const store = configureStore({
//   reducer: {
//     counter: bookMarkReducer,
//   },
// })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
