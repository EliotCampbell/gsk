import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  setError,
  setSuccess
} from '@/clientServices/redux/features/notification/notificationSlice'
import { authSA } from '@/serverServices/supabase/exports'
import { Session, User, WeakPassword } from '@supabase/gotrue-js'

type TInitialState = { exists: boolean; isLoading: boolean }

const initialState: TInitialState = { exists: false, isLoading: true }

type TThunkApi = {
  extra: {
    authSA: typeof authSA
  }
}

interface ILoggedUser {
  user: User
  session: Session
  weakPassword?: WeakPassword | undefined
}

interface ICheckedSession {
  session: Session | null
}

export const authWithCredentials = createAsyncThunk<
  ILoggedUser,
  FormData,
  TThunkApi
>('auth/authWithCredentials', async (formData, thunkAPI) => {
  try {
    const data = await thunkAPI.extra.authSA.SignInWithPassword(formData)
    if ('error' in data) {
      throw new Error(data.error.message)
    }
    if (data) {
      thunkAPI.dispatch(setSuccess('Logged in!'))
      return data
    }
    throw new Error('Unexpected server response')
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})

export const checkLocalSession = createAsyncThunk<
  ICheckedSession,
  void,
  TThunkApi
>('auth/checkLocalSession', async (_, thunkAPI) => {
  try {
    const data = await thunkAPI.extra.authSA.serverCheckLocalSession()
    if ('error' in data && data.error) {
      throw new Error(data.error.message)
    }
    if ('session' in data && data.session) {
      thunkAPI.dispatch(setSuccess('Session found successfully!'))
      return data
    }
    if ('session' in data && !data.session) {
      thunkAPI.dispatch(setError('Session not found'))
      return data
    }
    throw new Error('Unexpected server response')
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})

export const signOut = createAsyncThunk<void, void, TThunkApi>(
  'auth/signOut',
  async (_, thunkAPI) => {
    try {
      const data = await thunkAPI.extra.authSA.serverSignOut()
      if (data) {
        throw new Error(data.data.error.message)
      }
      if (!data) {
        thunkAPI.dispatch(setSuccess('Successfully sign out!'))
        return
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
  reducers: {},
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
      if (action.payload.session?.access_token) {
        return { ...state, exists: true, isLoading: false }
      } else return { ...state, exists: false, isLoading: false }
    })
    builder.addCase(signOut.fulfilled, (state) => {
      return { ...state, isLoading: false, exists: false }
    })
    builder.addCase(signOut.rejected, (state) => {
      return { ...state, isLoading: true }
    })
  }
})

export const {} = authSlice.actions

export default authSlice.reducer
