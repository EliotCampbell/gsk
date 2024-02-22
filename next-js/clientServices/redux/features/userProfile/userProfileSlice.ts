import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TUserSA } from '@/serverServices/supabase/exports'
import { setError } from '@/clientServices/redux/features/notification/notificationSlice'
import { User } from '@supabase/gotrue-js'
import { IPublicUser } from '@/serverServices/supabase/serverActions/userActions'

type TProfileState = {
  userPrivateData: {}
  userPublicData: {}
  isLoading: boolean
}

const initialState: TProfileState = {
  isLoading: true,
  userPrivateData: {},
  userPublicData: {}
}

type TThunkApi = {
  extra: { userSA: TUserSA }
}

interface IPrivateUserData {
  user: User
}

interface IPublicUserData {
  user: IPublicUser['data']['user']
}

export const getPrivateUser = createAsyncThunk<
  IPrivateUserData,
  void,
  TThunkApi
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
  IPublicUserData,
  string,
  TThunkApi
>('userProfile/getPublicUser', async (userId, thunkAPI) => {
  try {
    const data = await thunkAPI.extra.userSA.getPublicUser(userId)
    if ('error' in data && data.error) {
      throw new Error(data.error.message)
    } else if ('id' in data && data.id) {
      return data
    } else {
      throw new Error('Unexpected server response')
    }
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})

//todo:combine functions
export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPrivateUser.pending, (state) => {
      return { ...state, isLoading: true }
    })
    builder.addCase(
      getPrivateUser.fulfilled,
      (state, action: PayloadAction<IPrivateUserData>) => {
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
    builder.addCase(getPublicUser.pending, (state) => {
      return { ...state }
    })
    builder.addCase(
      getPublicUser.fulfilled,
      (state, action: PayloadAction<IPublicUserData>) => {
        return { ...state, userPublicData: action.payload }
      }
    )
  }
})

export const {} = userProfileSlice.actions

export default userProfileSlice.reducer
