import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import usersReducer from './usersSlice'
import rolesReducer from './rolesSlice'
import locationsReducer from './locationsSlice'
import devicesReducer from './devicesSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    roles: rolesReducer,
    locations: locationsReducer,
    devices: devicesReducer,
  }
})

export type SmartG4RootState = ReturnType<typeof store.getState>
export type SmartG4Dispatch = typeof store.dispatch
export default store