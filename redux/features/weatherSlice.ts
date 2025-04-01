import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface WeatherState {
  cities:any[]
  favoriteCities: string[]
  loading: boolean
  error: string | null
}

const initialState: WeatherState = {
  cities:[],
  favoriteCities: [],
  loading: false,
  error: null,
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action: PayloadAction<string>) => {
      const cityId = action.payload
      const index = state.favoriteCities.indexOf(cityId)

      if (index === -1) {
        state.favoriteCities.push(cityId)
      } else {
        state.favoriteCities.splice(index, 1)
      }
    },
    fetchWeatherStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchWeatherSuccess: (state) => {
      state.loading = false
    },
    fetchWeatherFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    set:(state, action: PayloadAction<any[]>) => {
      state.cities = action.payload
    },
  },
})

export const { toggleFavoriteCity, fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure,set } = weatherSlice.actions

export default weatherSlice.reducer

