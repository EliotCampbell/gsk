import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { serverGetUserProfileData } from '@/lib/supabase/actions'

const initialState = { user: {} }

export const getUserProfileData = createAsyncThunk(
  'userProfile/getUser',
  async () => {
    const response = await serverGetUserProfileData()
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
