import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './features/notification/notificationSlice'
import authReducer from './features/auth/authSlice'
import userProfileReducer from './features/userProfile/userProfileSlice'
import objectsReducer from './features/objects/objectsSlice'
import adsReducer from './features/ads/adsSlice'
import * as actions from '@/serverServices/supabase/exports'

export const makeStore = () => {
  return configureStore({
    reducer: {
      notification: notificationReducer,
      auth: authReducer,
      userProfile: userProfileReducer,
      objects: objectsReducer,
      ads: adsReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: { ...actions } }
      })
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
