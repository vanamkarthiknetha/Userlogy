import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface CryptoState {
  favoriteCryptos: string[]
  loading: boolean
  error: string | null
}

const initialState: CryptoState = {
  favoriteCryptos: [],
  loading: false,
  error: null,
}

interface PriceUpdatePayload {
  id: string
  priceChange: number
}

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    toggleFavoriteCrypto: (state, action: PayloadAction<string>) => {
      const cryptoId = action.payload
      const index = state.favoriteCryptos.indexOf(cryptoId)

      if (index === -1) {
        state.favoriteCryptos.push(cryptoId)
      } else {
        state.favoriteCryptos.splice(index, 1)
      }
    },
    fetchCryptoStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchCryptoSuccess: (state) => {
      state.loading = false
    },
    fetchCryptoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    updateCryptoPrice: (state, action: PayloadAction<PriceUpdatePayload>) => {
      // In a real app, this would update the price in the state
      // For this mock UI, we're just handling the action
      console.log(`Updating ${action.payload.id} price by ${action.payload.priceChange.toFixed(2)}%`)
    },
  },
})

export const { toggleFavoriteCrypto, fetchCryptoStart, fetchCryptoSuccess, fetchCryptoFailure, updateCryptoPrice } =
  cryptoSlice.actions

export default cryptoSlice.reducer

