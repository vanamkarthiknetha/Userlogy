import { configureStore } from "@reduxjs/toolkit"
import weatherReducer from "./features/weatherSlice"
import cryptoReducer from "./features/cryptoSlice"

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
  },
  // Add middleware like Redux Thunk here if needed
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

