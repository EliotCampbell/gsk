import { createSlice } from '@reduxjs/toolkit'
import { INotification } from '@/types/types'

// Define a type for the slice state

// Define the initial state using that type
const initialState: INotification = {
  message: '',
  type: ''
}

export const notificationSlice = createSlice({
  name: 'notification',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setError: (_, action) => {
      return { message: action.payload, type: 'error' }
    },
    setSuccess: (_, action) => {
      return { message: action.payload, type: 'success' }
    },
    clearError: () => {
      return initialState
    }
  }
})

export const { setError, setSuccess, clearError } = notificationSlice.actions

export default notificationSlice.reducer
