import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import overlayReducer from "./reducer/overlayReducer";
import sidebarReducer from "./reducer/sidebarReducer";

const rootReducer = combineReducers({
  user: userReducer,
  overlay: overlayReducer,
  sidebar: sidebarReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
