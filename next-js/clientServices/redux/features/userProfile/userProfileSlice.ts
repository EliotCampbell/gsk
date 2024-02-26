import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  IPrivateUser,
  IPublicUser,
  UserSAType
} from '@/serverServices/supabase/exports'
import { setError } from '@/clientServices/redux/features/notification/notificationSlice'

type ProfileStateType = {
  userPrivateData: Record<string, never> | IPrivateUser['data']['user']
  userPublicData: Record<string, never> | IPublicUser['data']['user']
  isLoading: boolean
}

const initialState: ProfileStateType = {
  isLoading: true,
  userPrivateData: {},
  userPublicData: {}
}

type ThunkApiType = {
  extra: { userSA: UserSAType }
}

export const getPrivateUser = createAsyncThunk<
  IPrivateUser['data'],
  void,
  ThunkApiType
>('userProfile/getPrivateUser', async (_, thunkAPI) => {
  try {
    const data = await thunkAPI.extra.userSA.getPrivateUser()
    if ('error' in data && data.error) {
      throw new Error(data.error.message)
    }
    if ('user' in data && data.user) {
      return data
    } else {
      throw new Error('Unexpected server response')
    }
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})

export const getPublicUser = createAsyncThunk<
  IPublicUser['data'],
  string,
  ThunkApiType
>('userProfile/getPublicUser', async (userId, thunkAPI) => {
  try {
    const data = await thunkAPI.extra.userSA.getPublicUser(userId)
    if (data.error) {
      throw new Error(data.error.message)
    }
    if (data.user) {
      return data
    } else {
      throw new Error('Unexpected server response')
    }
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //PrivateUser
    builder.addCase(getPrivateUser.pending, (state) => {
      return { ...state, isLoading: true }
    })
    builder.addCase(getPrivateUser.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        userPrivateData: action.payload.user
      }
    })
    builder.addCase(getPrivateUser.rejected, () => {
      return { ...initialState, isLoading: false }
    })
    //PublicUser
    builder.addCase(getPublicUser.pending, (state) => {
      return { ...state }
    })
    builder.addCase(getPublicUser.fulfilled, (state, action) => {
      return { ...state, userPublicData: action.payload.user }
    })
    builder.addCase(getPublicUser.rejected, (state) => {
      return { ...state, isLoading: false }
    })
  }
})

export const {} = userProfileSlice.actions

export default userProfileSlice.reducer
