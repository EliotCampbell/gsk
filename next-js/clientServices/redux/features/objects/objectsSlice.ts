import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ObjectsSAType } from '@/serverServices/supabase/exports'
import { IGetMyObjects } from '@/serverServices/supabase/serverActions/objectsActions'
import { setError } from '@/clientServices/redux/features/notification/notificationSlice'
import { STATUS } from '@/types/statusTypes'

type ObjectsStateType = {
  myObjects: {
    data: NonNullable<IGetMyObjects['data']['objects']>
    status: STATUS
  }
}

const initialState: ObjectsStateType = {
  myObjects: { data: [], status: STATUS.ok }
}

type ThunkApiType = {
  extra: { objectsSA: ObjectsSAType }
}

export const getMyObjects = createAsyncThunk<
  IGetMyObjects['data']['objects'],
  void,
  ThunkApiType
>('objects/getMyObjects', async (_, thunkAPI) => {
  try {
    const { error, objects } = await thunkAPI.extra.objectsSA.getMyObjects()
    if (error) {
      throw error
    }
    if (objects) {
      return objects
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
    builder.addCase(getMyObjects.pending, (state) => {
      return { ...state, myObjects: { data: [], status: STATUS.pending } }
    })
    builder.addCase(getMyObjects.fulfilled, (state, action) => {
      return {
        ...state,
        myObjects: {
          data: action.payload ? action.payload : [],
          status: STATUS.ok
        }
      }
    })
    builder.addCase(getMyObjects.rejected, (state) => {
      return { ...state, myObjects: { data: [], status: STATUS.rejected } }
    })
  }
})

export const {} = objectsSlice.actions

export default objectsSlice.reducer
