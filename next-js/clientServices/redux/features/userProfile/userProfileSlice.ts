import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userSA } from '@/serverServices/supabase/exports'
import { setError } from '@/clientServices/redux/features/notification/notificationSlice'
import { User } from '@supabase/gotrue-js'
import { PublicUserType } from '@/serverServices/supabase/serverActions/userActions'

type TProfileState = {
  userPrivateData: {}
  userPublicData: {}
  isLoading: boolean
}

type TThunkApi = {
  extra: { userSA: typeof userSA }
  rejectValue: string
} //todo: export this

const initialState: TProfileState = {
  isLoading: true,
  userPrivateData: {},
  userPublicData: {}
}

interface IUserProfileData {
  user: User
}

export const getPrivateUser = createAsyncThunk<
  IUserProfileData,
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
  { user: PublicUserType['data']['user'] },
  string,
  TThunkApi
>('userProfile/getPublicUser', async (userId, thunkAPI) => {
  try {
    const data = await thunkAPI.extra.userSA.getPublicUser(userId)
    if ('error' in data && data.error) {
      throw new Error(data.error.message)
    }
    if ('id' in data && data.id) {
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
      (state, action: PayloadAction<IUserProfileData>) => {
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
      (
        state,
        action: PayloadAction<{ user: PublicUserType['data']['user'] }>
      ) => {
        return { ...state, action: action.payload }
      }
    )
  }
})

export const {} = userProfileSlice.actions

export default userProfileSlice.reducer
