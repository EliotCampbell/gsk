import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authSlice } from '@/clientServices/redux/features/auth/authSlice'
import { AdsSAType } from '@/serverServices/supabase/exports'
import { setError } from '@/clientServices/redux/features/notification/notificationSlice'
import { IGetAdsByUser } from '@/serverServices/supabase/serverActions/adsActions'

type AdsStateType = {
  ads: { data: IGetAdsByUser['data']['ads'] | []; pending: boolean }
}

type ThunkApiType = {
  extra: {
    adsSA: AdsSAType
  }
}

const initialState: AdsStateType = { ads: { data: [], pending: true } }

export const getAdsByUser = createAsyncThunk<
  IGetAdsByUser['data'],
  string,
  ThunkApiType
>('', async (userId, thunkAPI) => {
  try {
    const data = await thunkAPI.extra.adsSA.getAdsByUser(userId)
    if (data.error) {
      throw data.error
    }
    if (data.ads) {
      console.log(data)
      return data
    } else {
      throw new Error('Unexpected server response')
    }
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})

export const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdsByUser.pending, (state) => {
      return { ...state, ads: { ...state.ads, pending: true } }
    })
    builder.addCase(getAdsByUser.fulfilled, (state, action) => {
      return { ...state, ads: { data: action.payload.ads, pending: false } }
    })
    builder.addCase(getAdsByUser.rejected, (state) => {
      return { ...state, ads: { ...state.ads, pending: false } }
    })
  }
})

export const {} = authSlice.actions

export default adsSlice.reducer
