import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userSA } from '@/serverServices/supabase/exports'

type TProfileState = {
  user: {}
  isLoading: boolean
}

type TThunkApi = { extra: { userSA: typeof userSA } }

const initialState: TProfileState = { isLoading: true, user: {} }

export const getUserProfileData = createAsyncThunk<void, void, TThunkApi>(
  'userProfile/getUser',
  async (_, thunkAPI) => {
    const response = await thunkAPI.extra.userSA.serverGetUserProfileData()
    console.log(response)
  }
)

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (_, action) => {
      return { ...action.payload }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfileData.pending, (state) => {
      return { ...state, isLoading: true }
    })
    builder.addCase(getUserProfileData.fulfilled, () => {})
    builder.addCase(getUserProfileData.rejected, () => {})
  }
})

export const { setUserProfile } = userProfileSlice.actions

export default userProfileSlice.reducer
