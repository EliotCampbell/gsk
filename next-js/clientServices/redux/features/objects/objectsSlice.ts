import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ObjectsSAType } from '@/serverServices/supabase/exports'
import { IGetMyObjects } from '@/serverServices/supabase/serverActions/objectsActions'
import { setError } from '@/clientServices/redux/features/notification/notificationSlice'

type ObjectsStateType = {
  objects: []
}

const initialState: ObjectsStateType = { objects: [] }

type ThunkApiType = {
  extra: { objectsSA: ObjectsSAType }
}

export const getMyObjects = createAsyncThunk<
  IGetMyObjects['data'],
  void,
  ThunkApiType
>('object/getMyObjects', async (_, thunkAPI) => {
  try {
    const data = await thunkAPI.extra.objectsSA.getMyObjects()
    if (data.error) {
      throw data.error
    }
    if (data.objects) {
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

export const objectsSlice = createSlice({
  name: 'objects',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyObjects.pending, (state) => {})
    builder.addCase(getMyObjects.fulfilled, (state, action) => {})
    builder.addCase(getMyObjects.rejected, (state) => {})
  }
})