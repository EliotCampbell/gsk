import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = { user: {} }

export const getUserProfileData = createAsyncThunk(
  'userProfile/getUser',
  async (_, thunkAPI) => {
    const response = await thunkAPI.extra
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
  }
})

export const { setUserProfile } = userProfileSlice.actions

export default userProfileSlice.reducer
