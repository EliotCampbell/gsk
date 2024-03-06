import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  setError,
  setInto,
  setSuccess
} from '@/clientServices/redux/features/notification/notificationSlice'
import {
  AuthSAType,
  ICheckLocalSession,
  IGetUser,
  ISignInWithPassword,
  IRefreshSession
} from '@/serverServices/supabase/exports'
import { STATUS } from '@/types/statusTypes'

type AuthStateType = {
  sessionData: {
    session:
      | NonNullable<ICheckLocalSession['data']['session']>
      | Record<string, never>
    status: STATUS
  }
  userData: {
    user:
      | NonNullable<ISignInWithPassword['data']['user']>
      | Record<string, never>
    status: STATUS
  }
}

const initialState: AuthStateType = {
  sessionData: { session: {}, status: STATUS.pending },
  userData: { user: {}, status: STATUS.pending }
}

type ThunkApiType = {
  extra: {
    authSA: AuthSAType
  }
}

export const signInWithPassword = createAsyncThunk<
  NonNullable<ISignInWithPassword['data']['user']>,
  FormData,
  ThunkApiType
>('getUser/signInWithPassword', async (formData, thunkAPI) => {
  try {
    const { user, error } =
      await thunkAPI.extra.authSA.signInWithPassword(formData)
    if (error) {
      throw new Error(error.message)
    }
    if (user) {
      thunkAPI.dispatch(setSuccess('Successfully logged in!'))
      return user
    }
    throw new Error('Unexpected server response')
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})

export const checkLocalSession = createAsyncThunk<
  ICheckLocalSession['data']['session'],
  void,
  ThunkApiType
>('getUser/checkLocalSession', async (_, thunkAPI) => {
  try {
    const { error, session } = await thunkAPI.extra.authSA.checkLocalSession()
    if (error) {
      throw error
    }
    if (session) {
      thunkAPI.dispatch(setSuccess('Session found successfully!'))
      return session
    }
    if (!session) {
      thunkAPI.dispatch(setInto('Session not found'))
      return session
    }
    throw new Error('Unexpected server response')
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})

export const getUser = createAsyncThunk<
  NonNullable<IGetUser['data']['user']>,
  void,
  ThunkApiType
>('userProfile/getUser', async (_, thunkAPI) => {
  try {
    const { user, error } = await thunkAPI.extra.authSA.getUser()
    if (error) {
      throw error
    }
    if (user) {
      return user
    }
    throw new Error('Unexpected server response')
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})

export const refreshSession = createAsyncThunk<
  {
    session: NonNullable<IRefreshSession['data']['session']>
    user: NonNullable<IRefreshSession['data']['user']>
  },
  void,
  ThunkApiType
>('userProfile/refreshSession', async (_, thunkAPI) => {
  try {
    const { session, user, error } =
      await thunkAPI.extra.authSA.refreshSession()
    if (error) {
      throw error
    }
    if (session && user) {
      return { session: session, user: user }
    }
    throw new Error('Unexpected server response')
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})

export const signOut = createAsyncThunk<void, void, ThunkApiType>(
  'getUser/signOut',
  async (_, thunkAPI) => {
    try {
      const data = await thunkAPI.extra.authSA.signOut()
      if (data) {
        throw new Error(data.error.message)
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

/**
 * AuthSlice
 */

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Auth
    builder.addCase(signInWithPassword.pending, (state) => {
      return { ...state, userData: { user: {}, status: STATUS.pending } }
    })
    builder.addCase(signInWithPassword.fulfilled, (state, action) => {
      return { ...state, userData: { user: action.payload, status: STATUS.ok } }
    })
    builder.addCase(signInWithPassword.rejected, (state) => {
      return { ...state, userData: { user: {}, status: STATUS.rejected } }
    })
    //Check session
    builder.addCase(checkLocalSession.pending, (state) => {
      return { ...state, sessionData: { session: {}, status: STATUS.pending } }
    })
    builder.addCase(checkLocalSession.fulfilled, (state, action) => {
      if (action.payload?.access_token) {
        return {
          ...state,
          sessionData: { status: STATUS.ok, session: action.payload }
        }
      } else
        return { ...state, sessionData: { status: STATUS.ok, session: {} } }
    })
    builder.addCase(checkLocalSession.rejected, (state) => {
      return { ...state, sessionData: { session: {}, status: STATUS.rejected } }
    })
    //getUser
    builder.addCase(getUser.pending, (state) => {
      return {
        ...state,
        userPrivateData: {
          ...state,
          userData: { status: STATUS.pending, user: {} }
        }
      }
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      return {
        ...state,
        userPrivateData: {
          ...state,
          userData: { status: STATUS.pending, user: action.payload }
        }
      }
    })
    builder.addCase(getUser.rejected, (state) => {
      return {
        ...state,
        userPrivateData: {
          ...state,
          userData: { status: STATUS.rejected, user: {} }
        }
      }
    })
    //SignOut
    builder.addCase(signOut.pending, (state) => {
      return {
        ...state,
        sessionData: { session: {}, status: STATUS.pending },
        userData: { status: STATUS.pending, user: {} }
      }
    })
    builder.addCase(signOut.fulfilled, (state) => {
      return {
        ...state,
        sessionData: { session: {}, status: STATUS.ok },
        userData: { status: STATUS.ok, user: {} }
      }
    })
    builder.addCase(signOut.rejected, (state) => {
      return {
        ...state,
        sessionData: { session: {}, status: STATUS.rejected },
        userData: { status: STATUS.rejected, user: {} }
      }
    })
    //RefreshSession
    builder.addCase(refreshSession.pending, (state) => {
      return {
        ...state,
        sessionData: { session: {}, status: STATUS.pending },
        userData: { status: STATUS.pending, user: {} }
      }
    })
    builder.addCase(refreshSession.fulfilled, (state, action) => {
      return {
        ...state,
        sessionData: {
          status: STATUS.ok,
          session: action.payload.session
        },
        userData: { status: STATUS.ok, user: action.payload.user }
      }
    })
    builder.addCase(refreshSession.rejected, (state) => {
      return {
        ...state,
        sessionData: { session: {}, status: STATUS.rejected },
        userData: { status: STATUS.rejected, user: {} }
      }
    })
  }
})

export const {} = authSlice.actions

export default authSlice.reducer
