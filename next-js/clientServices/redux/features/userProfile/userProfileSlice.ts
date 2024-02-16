import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userSA } from '@/serverServices/supabase/exports'
import { setError } from '@/clientServices/redux/features/notification/notificationSlice'
import { User } from '@supabase/gotrue-js'
import { Database, Tables } from '@/types/supabase'

type TProfileState = {
  userPrivateData: {}
  userPublicData: {}
  isLoading: boolean
}

type TThunkApi = { extra: { userSA: typeof userSA } } //todo: export this

const initialState: TProfileState = {
  isLoading: true,
  userPrivateData: {},
  userPublicData: {}
}

type TUserProfileData = {
  user: User
}

export const getPrivateUser = createAsyncThunk<
  TUserProfileData,
  void,
  TThunkApi
>('userProfile/getUser', async (_, thunkAPI) => {
  try {
    const data = await thunkAPI.extra.userSA.serverGetPrivateUser()
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

export const getPublicUser = createAsyncThunk<{}, string, TThunkApi>( //todo: add type
  'userProfile/getUser',
  async (userId, thunkAPI) => {
    try {
      const data = await thunkAPI.extra.userSA.serverGetPublicUser(userId)
      if ('error' in data && data.error) {
        throw new Error(data.error.message)
      }
      if ('data' in data && data) {
        return data
      } else {
        throw new Error('Unexpected server response')
      }
    } catch (error) {
      thunkAPI.dispatch(setError((error as Error).message))
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)
//todo:combine functions
export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (_, action: PayloadAction<{ str: string }>) => {
      //todo: должно совпадать с ретюрном санка
      return { isLoading: false, userPrivateData: {}, userPublicData: {} }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPrivateUser.pending, (state) => {
      return { ...state, isLoading: true }
    })
    builder.addCase(
      getPrivateUser.fulfilled,
      (state, action: PayloadAction<TUserProfileData>) => {
        return {
          ...state,
          isLoading: false,
          userPrivateData: action.payload.user
        }
      }
    )
    builder.addCase(getPrivateUser.rejected, () => {
      return { ...initialState, isLoading: false }
    })
  }
})

export const { setUserProfile } = userProfileSlice.actions

export default userProfileSlice.reducer
