import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './features/notification/notificationSlice'
import authReducer from '@/clientServices/redux/features/auth/authSlice'
import userProfileReducer from '@/clientServices/redux/features/userProfile/userProfileSlice'
import * as actions from '@/serverServices/supabase/exports'

export const makeStore = () => {
  return configureStore({
    reducer: {
      notification: notificationReducer,
      auth: authReducer,
      userProfile: userProfileReducer
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
