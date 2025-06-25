import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../apis/login";
import { profileApi } from "../apis/profile";
import loginReducer from "../slices/loginSlice";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([loginApi.middleware, profileApi.middleware]),
});

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;