import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  setError,
  setInto,
  setSuccess
} from '@/clientServices/redux/features/notification/notificationSlice'
import {
  ICheckLocalSession,
  ISignInWithPassword,
  AuthSAType
} from '@/serverServices/supabase/exports'

type AuthStateType = { exists: boolean; isLoading: boolean }

const initialState: AuthStateType = { exists: false, isLoading: true }

type ThunkApiType = {
  extra: {
    authSA: AuthSAType
  }
}

export const signInWithPassword = createAsyncThunk<
  ISignInWithPassword['data'],
  FormData,
  ThunkApiType
>('auth/signInWithPassword', async (formData, thunkAPI) => {
  try {
    const data = await thunkAPI.extra.authSA.signInWithPassword(formData)
    if (data.error) {
      throw new Error(data.error.message)
    }
    if (data) {
      thunkAPI.dispatch(setSuccess('Successfully logged in!'))
      return data
    }
    throw new Error('Unexpected server response')
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})

export const checkLocalSession = createAsyncThunk<
  ICheckLocalSession['data'],
  void,
  ThunkApiType
>('auth/checkLocalSession', async (_, thunkAPI) => {
  try {
    const data = await thunkAPI.extra.authSA.checkLocalSession()
    if (data.error) {
      throw new Error(data.error.message)
    }
    if (data.session) {
      thunkAPI.dispatch(setSuccess('Session found successfully!'))
      return data
    }
    if (!data.session) {
      thunkAPI.dispatch(setInto('Session not found'))
      return data
    }
    throw new Error('Unexpected server response')
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})

export const signOut = createAsyncThunk<void, void, ThunkApiType>(
  'auth/signOut',
  async (_, thunkAPI) => {
    try {
      const data = await thunkAPI.extra.authSA.signOut()
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
    //Auth
    builder.addCase(
      signInWithPassword.pending ||
        checkLocalSession.pending ||
        signOut.pending,
      (state) => {
        return { ...state, isLoading: true }
      }
    )
    builder.addCase(
      signInWithPassword.rejected || checkLocalSession.rejected,
      (state) => {
        return { ...state, exists: false, isLoading: false }
      }
    )
    builder.addCase(signInWithPassword.fulfilled, (state) => {
      return { ...state, exists: true, isLoading: false }
    })
    builder.addCase(
      checkLocalSession.fulfilled,
      (state, action: PayloadAction<ICheckLocalSession['data']>) => {
        if (action.payload.session?.access_token) {
          return { ...state, exists: true, isLoading: false }
        } else return { ...state, exists: false, isLoading: false }
      }
    )
    //SignOut
    builder.addCase(signOut.pending, (state) => {
      return { ...state, isLoading: true }
    })
    builder.addCase(signOut.fulfilled, (state) => {
      return { ...state, isLoading: false, exists: false }
    })
    builder.addCase(signOut.rejected, (state) => {
      return { ...state }
    })
  }
})

export const {} = authSlice.actions

export default authSlice.reducer
