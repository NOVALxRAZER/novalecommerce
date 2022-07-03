import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import getAllUsersReducer from "./browseUsersRedux/getAllUserRedux";
import editUserReducer from "./browseUsersRedux/editUserRedux";
import deleteUserReducer from "./browseUsersRedux/deleteUserRedux";
import addUserReducer from "./browseUsersRedux/addUserRedux";
import getUserReducer from "./browseUsersRedux/getUserRedux";
import getAllProductsReducer from "./browseProductsRedux/getAllProductsRedux"
import getProductReducer from "./browseProductsRedux/getProductRedux"
import editProductReducer from "./browseProductsRedux/editProductRedux"
import deleteProductReducer from "./browseProductsRedux/deleteProductRedux"
import addProductReducer from "./browseProductsRedux/addProductRedux"
import getAllUserOrderReducer from "./browseOrderHistory/AllUserOrder"
import editOrderUsers from "./browseOrderHistory/editUserOrder"
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
  getAllUsers: getAllUsersReducer,
  editUsers: editUserReducer,
  deleteUsers: deleteUserReducer,
  addUsers: addUserReducer,
  getUser: getUserReducer,
  getAllProducts: getAllProductsReducer,
  getProducts: getProductReducer,
  editProducts: editProductReducer,
  deleteProducts: deleteProductReducer,
  addProducts: addProductReducer,
  getAllUserOrders: getAllUserOrderReducer,
  editUserOrder: editOrderUsers,
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

export let persistor = persistStore(store);