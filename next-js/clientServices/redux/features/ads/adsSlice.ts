import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  AdsSAType,
  IGetAdsByUser,
  utilsSAType
} from '@/serverServices/supabase/exports'
import { setError } from '@/clientServices/redux/features/notification/notificationSlice'
import { STATUS } from '@/types/statusTypes'

type AdsStateType = {
  adsList: {
    data: NonNullable<IGetAdsByUser['data']['ads']>
    status: STATUS
  }
}

type ThunkApiType = {
  extra: {
    adsSA: AdsSAType
    utilsSA: utilsSAType
  }
}

const initialState: AdsStateType = { adsList: { data: [], status: STATUS.ok } }

export const getAdsByUser = createAsyncThunk<
  IGetAdsByUser['data']['ads'],
  string | undefined,
  ThunkApiType
>('ads/getAdsByUser', async (userId = undefined, thunkAPI) => {
  try {
    const id = userId || (await thunkAPI.extra.utilsSA.getUserId())
    if (!id) throw new Error('Field userId is not provided')
    const { error, ads } = await thunkAPI.extra.adsSA.getAdsByUser(id)
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
