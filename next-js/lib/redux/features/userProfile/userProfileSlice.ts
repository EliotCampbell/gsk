import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { serverAction } from '@/lib/redux/features/userProfile/serverActions'

const initialState = { user: {} }

export const getUser = createAsyncThunk('userProfile/getUser', async () => {
  const response = await serverAction()
  console.log(response)
})

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
