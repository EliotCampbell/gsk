import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  setError,
  setSuccess
} from '@/lib/redux/features/notification/notificationSlice'
import {
  serverCheckLocalSession,
  serverSignInWithPassword,
  serverSignOut
} from '@/lib/supabase/actions'

const initialState = { exists: false, isLoading: true }

export const authWithCredentials = createAsyncThunk(
  'auth/authWithCredentials',
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await serverSignInWithPassword(formData)
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

export const checkLocalSession = createAsyncThunk(
  'auth/checkLocalSession',
  async (_, thunkAPI) => {
    try {
      const response = await serverCheckLocalSession()
      if ('error' in response && response.error) {
        throw new Error(response.error.message)
      }
      if ('session' in response && response.session) {
        thunkAPI.dispatch(setSuccess('Session found successfully!'))
        return response.session
      }
      if ('session' in response && !response.session) {
        thunkAPI.dispatch(setError('Session not found'))
        return response.session
      }
      throw new Error('Unexpected server response')
    } catch (error) {
      thunkAPI.dispatch(setError((error as Error).message))
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const signOut = createAsyncThunk('auth/signOut', async (_, thunkAPI) => {
  try {
    const response = await serverSignOut()
    if (response) {
      throw new Error(response.data.error.message)
    }
    if (!response) {
      return thunkAPI.dispatch(setSuccess('Successfully sign out!'))
    }
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      authWithCredentials.pending ||
        checkLocalSession.pending ||
        signOut.pending,
      (state) => {
        return { ...state, isLoading: true }
      }
    )
    builder.addCase(
      authWithCredentials.rejected || checkLocalSession.rejected,
      (state) => {
        return { ...state, exists: false, isLoading: false }
      }
    )
    builder.addCase(authWithCredentials.fulfilled, (state) => {
      return { ...state, exists: true, isLoading: false }
    })
    builder.addCase(checkLocalSession.fulfilled, (state, action) => {
      if (action.payload?.access_token) {
        return { ...state, exists: true, isLoading: false }
      } else return { ...state, exists: false, isLoading: false }
    })
    builder.addCase(signOut.fulfilled, (state) => {
      return { ...state, isLoading: false, exists: false }
    })
    builder.addCase(signOut.rejected, (state) => {
      return { ...state, isLoading: false }
    })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
