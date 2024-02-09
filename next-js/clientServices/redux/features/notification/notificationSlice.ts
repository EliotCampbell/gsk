import { createSlice } from '@reduxjs/toolkit'
import { INotification } from '@/types/types'

const initialState: INotification = {
  message: '',
  type: ''
}

export const notificationSlice = createSlice({
  name: 'notification',
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
