import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { sessionReducer, sessionService } from 'redux-react-session';
import userReducer from "./userRedux";
import cartReducer from "./cartRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  session: sessionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// const validateSession = (session) => {
//   // check if your session is still valid with a server check, through axios for instance
//   return api.invokeRemoteSessionValidationThroughAxios(session).then(response => response.isSessionValid);
// }
const options = { refreshOnCheckAuth: true, redirectPath: '/login', driver: 'COOKIES' };

export let persistor = persistStore(store);
sessionService.initSessionService(store, options)
  .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
  .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));