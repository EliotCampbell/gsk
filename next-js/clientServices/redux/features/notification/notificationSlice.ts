import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TNotification } from '@/types/types'

type TNotificationState = TNotification
const initialState: TNotificationState = {
  message: '',
  type: ''
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setError: (_, action: PayloadAction<string>) => {
      return { message: action.payload, type: 'error' }
    },
    setSuccess: (_, action: PayloadAction<string>) => {
      return { message: action.payload, type: 'success' }
    },
    setInto: (_, action: PayloadAction<string>) => {
      return { message: action.payload, type: 'info' }
    },
    clear: () => {
      return initialState
    }
  }
})

export const { setError, setSuccess, setInto, clear } =
  notificationSlice.actions

export default notificationSlice.reducer
