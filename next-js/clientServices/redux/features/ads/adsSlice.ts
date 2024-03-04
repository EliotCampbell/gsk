import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AdsSAType } from '@/serverServices/supabase/exports'
import { setError } from '@/clientServices/redux/features/notification/notificationSlice'
import { IGetAdsByUser } from '@/serverServices/supabase/serverActions/adsActions'
import { STATUS } from '@/types/statusTypes'

type AdsStateType = {
  adsList: {
    data: NonNullable<IGetAdsByUser['data']['ads']> | []
    status: STATUS
  }
}

type ThunkApiType = {
  extra: {
    adsSA: AdsSAType
  }
}

const initialState: AdsStateType = { adsList: { data: [], status: STATUS.ok } }

export const getAdsByUser = createAsyncThunk<
  IGetAdsByUser['data']['ads'],
  string,
  ThunkApiType
>('ads/getAdsByUser', async (userId, thunkAPI) => {
  try {
    const { error, ads } = await thunkAPI.extra.adsSA.getAdsByUser(userId)
    if (error) {
      throw error
    }
    if (ads) {
      return ads
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
      return { ...state, adsList: { data: [], status: STATUS.pending } }
    })
    builder.addCase(getAdsByUser.fulfilled, (state, action) => {
      return {
        ...state,
        adsList: {
          data: action.payload ? action.payload : [],
          status: STATUS.ok
        }
      }
    })
    builder.addCase(getAdsByUser.rejected, (state) => {
      return { ...state, adsList: { data: [], status: STATUS.rejected } }
    })
  }
})

export const {} = adsSlice.actions

export default adsSlice.reducer
