import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './features/notification/notificationSlice'
import authSlice from '@/clientServices/redux/features/auth/authSlice'
import userProfileReducer from '@/clientServices/redux/features/userProfile/userProfileSlice'
import * as actions from '@/serverServices/supabase/exports'
export const makeStore = () => {
  return configureStore({
    reducer: {
      notification: notificationReducer,
      auth: authSlice,
      userProfile: userProfileReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: { ...actions } }
      })
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
