import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { serverAction } from '@/lib/redux/features/auth/serverActions'
import {
  setError,
  setSuccess
} from '@/lib/redux/features/notification/notificationSlice'

const initialState = { exists: false, isLoading: true }

export const authWithCredentials = createAsyncThunk(
  'auth/authWithCredentials',
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await serverAction(formData)
      if ('error' in response.data) {
        throw new Error(response.data.error.message)
      }
      if (response.data) {
        thunkAPI.dispatch(setSuccess('Logged in!'))
        return response.data
      }
      throw new Error('Unexpected server response')
    } catch (error) {
      thunkAPI.dispatch(setError((error as Error).message))
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authWithCredentials.rejected, () => {
      return { ...initialState, isLoading: false }
    })
    builder.addCase(authWithCredentials.fulfilled, (state) => {
      return { ...state, exists: true, isLoading: false }
    })
    builder.addCase(authWithCredentials.pending, (state) => {
      return { ...state, isLoading: true }
    })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
