import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  IGetObjectsByUser,
  ObjectsSAType
} from '@/serverServices/supabase/exports'
import { setError } from '@/clientServices/redux/features/notification/notificationSlice'
import { STATUS } from '@/types/statusTypes'
import { utilsCType } from '@/clientServices/supabase/exports'

type ObjectsStateType = {
  myObjects: {
    data: NonNullable<IGetObjectsByUser['data']['objects']>
    status: STATUS
  }
}

const initialState: ObjectsStateType = {
  myObjects: { data: [], status: STATUS.ok }
}

type ThunkApiType = {
  extra: { objectsSA: ObjectsSAType; utilsC: utilsCType }
}

export const getMyObjects = createAsyncThunk<
  IGetObjectsByUser['data']['objects'],
  string | undefined,
  ThunkApiType
>('objects/getObjectsByUser', async (userId, thunkAPI) => {
  try {
    const id = userId || (await thunkAPI.extra.utilsC.getUserId())
    if (!id) throw new Error('Field userId is not provided')
    const { error, objects } =
      await thunkAPI.extra.objectsSA.getObjectsByUser(id)
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
