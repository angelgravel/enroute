import { FC } from "react";

import { combineReducers, AnyAction } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import type { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import gameReducer from "./game";
import chosenRouteReducer from "./chosenRoute";

import Pin from "@assets/Pin";

// COMBINING ALL REDUCERS
const combinedReducer = combineReducers({
  game: gameReducer,
  chosenRoute: chosenRouteReducer,
  // OTHER REDUCERS WILL BE ADDED HERE
});

const persistConfig = {
  key: "EnRoute",
  version: 1,
  storage, // if needed, use a safer storage
};

const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

// const store = createStore(persistedReducer, bindMiddleware([thunkMiddleware])); // Creating the store again

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

export type RootState = ReturnType<typeof store.getState>;
export type Actions = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>(); // Export a hook that can be reused to resolve types
export function useAppSelector<TState = RootState, TSelected = unknown>(
  selector: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
): TSelected {
  return useSelector(selector);
}
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

const StoreWithProvider: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div>
            <Pin animate style={{ width: "25rem" }} />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreWithProvider;
