import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { expenseSlice } from "./expense/expense-slice";
import { loggerMiddleware } from "./middlewares/logger-middleware";

// combine reducersinto a single reducer
const rootReducer = combineReducers({
  EXPENSE: expenseSlice.reducer,
});

// create a basic configuration to tell redux to use the local storage
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["EXPENSE"],
  // blacklist: ["EXPENSE"],
};

// persist the reducers
const persistedReducers = persistReducer(persistConfig, rootReducer);

// send the persisted reducers to the store
const store = configureStore({
  reducer: persistedReducers,
  // tell redux to ignore all the actions sent by redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(loggerMiddleware.middleware),
});

// create a persisted version of the Store and export it
const persistor = persistStore(store);

// use the PersistGate component to give <App/> access to the persisted store

export { persistor, store };
