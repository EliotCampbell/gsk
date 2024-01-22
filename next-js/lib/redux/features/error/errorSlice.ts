import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface IErrorState {
  message: string
}

// Define the initial state using that type
const initialState: IErrorState = {
  message: ''
}

export const errorSlice = createSlice({
  name: 'error',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setError: (state, action) => {
      return { ...state, message: action.payload.message }
    },
    clearError: () => {
      return initialState
    }
  }
})

export const { setError, clearError } = errorSlice.actions

export default errorSlice.reducer
