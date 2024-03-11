import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  IGetServicesByUser,
  ServicesSAType
} from '@/serverServices/supabase/exports'
import { adsSlice } from '@/clientServices/redux/features/ads/adsSlice'
import {
  setError,
  setInfo
} from '@/clientServices/redux/features/notification/notificationSlice'
import { TablesInsert } from '@/types/supabase'
import { UtilsCType } from '@/clientServices/supabase/exports'
import { STATUS } from '@/types/statusTypes'

type ServicesStateType = {
  servicesList: {
    data: NonNullable<IGetServicesByUser['data']['services']>
    status: STATUS
  }
  createService: { status: STATUS }
}

const initialState: ServicesStateType = {
  servicesList: { data: [], status: STATUS.ok },
  createService: { status: STATUS.ok }
}

type ThunkAPIType = {
  extra: { servicesSA: ServicesSAType; utilsC: UtilsCType }
}

export const createService = createAsyncThunk<
  {},
  TablesInsert<'services'>,
  ThunkAPIType
>('services/createService', async (fields, thunkAPI) => {
  try {
    const { error, data, status, statusText, count } =
      await thunkAPI.extra.servicesSA.createService(fields)
    if (error) throw error
    if (data) {
      thunkAPI.dispatch(
        setInfo(`Объявление мастера '${data[0].title}' успешно создано`)
      )
      thunkAPI.dispatch(getServicesByUser())
    } else throw new Error('Unexpected supabase error')
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
  }
})

export const getServicesByUser = createAsyncThunk<
  IGetServicesByUser['data']['services'],
  string | undefined,
  ThunkAPIType
>('services/getServiceByUser', async (userId, thunkAPI) => {
  try {
    const id = userId || (await thunkAPI.extra.utilsC.getUserId())
    if (!id) throw new Error('Field userId is not provided')
    const { services, error } =
      await thunkAPI.extra.servicesSA.getServicesByUser(id)
    if (error) {
      throw error
    }
    if (services) return services
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})

export const deleteServiceById = createAsyncThunk<{}, string, ThunkAPIType>(
  'services/deleteServiceById',
  async (id, thunkAPI) => {
    try {
      const { data, status, statusText, count, error } =
        await thunkAPI.extra.servicesSA.deleteServiceById(id)
      if (error) {
        throw error
      }
      thunkAPI.dispatch(getServicesByUser())
    } catch (error) {
      thunkAPI.dispatch(setError((error as Error).message))
      thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createService.pending, (state) => ({
      ...state,
      createService: { status: STATUS.pending }
    }))
    builder.addCase(createService.fulfilled, (state) => ({
      ...state,
      createService: { status: STATUS.ok }
    }))
    builder.addCase(createService.rejected, (state) => ({
      ...state,
      createService: { status: STATUS.rejected }
    }))
    builder.addCase(getServicesByUser.pending, (state) => ({
      ...state,
      servicesList: { ...state.servicesList, status: STATUS.pending }
    }))
    builder.addCase(getServicesByUser.fulfilled, (state, action) => ({
      ...state,
      servicesList: { data: action.payload || [], status: STATUS.ok }
    }))
    builder.addCase(getServicesByUser.rejected, (state) => ({
      ...state,
      servicesList: { data: [], status: STATUS.rejected }
    }))
  }
})

export const {} = adsSlice.actions

export default servicesSlice.reducer
