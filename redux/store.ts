import { configureStore } from "@reduxjs/toolkit"
import weatherReducer from "./features/weatherSlice"
import cryptoReducer from "./features/cryptoSlice"
import notificationsReducer from "./features/notificationsSlice"

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    notifications: notificationsReducer,
  },
  // Add middleware like Redux Thunk here if needed
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

