import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IPublicUser, UserSAType } from '@/serverServices/supabase/exports'
import { setError } from '@/clientServices/redux/features/notification/notificationSlice'
import { STATUS } from '@/types/statusTypes'
import { UtilsCType } from '@/clientServices/supabase/exports'

type ProfileStateType = Required<{
  userPublicData: {
    status: STATUS
    data: IPublicUser['data']['user'] | Record<string, never>
  }
}>

const initialState: ProfileStateType = {
  userPublicData: { status: STATUS.ok, data: {} }
}

type ThunkApiType = {
  extra: { userSA: UserSAType; utilsC: UtilsCType }
}

export const getPublicUser = createAsyncThunk<
  IPublicUser['data']['user'],
  string | undefined,
  ThunkApiType
>('userProfile/getPublicUser', async (userId = '', thunkAPI) => {
  try {
    const id = userId || (await thunkAPI.extra.utilsC.getUserId())
    if (!id) throw new Error('Field userId is not provided')
    const { user, error } = await thunkAPI.extra.userSA.getPublicUserInfo(id)
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

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //PublicUser
    builder.addCase(getPublicUser.pending, (state) => {
      return {
        ...state,
        userPublicData: { ...state.userPublicData, status: STATUS.pending }
      }
    })
    builder.addCase(getPublicUser.fulfilled, (state, action) => {
      return {
        ...state,
        userPublicData: { data: action.payload, status: STATUS.ok }
      }
    })
    builder.addCase(getPublicUser.rejected, (state) => {
      return {
        ...state,
        userPublicData: { ...state.userPublicData, status: STATUS.rejected }
      }
    })
  }
})

export const {} = userProfileSlice.actions

export default userProfileSlice.reducer
