import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import usersReducer from './usersSlice'
import rolesReducer from './rolesSlice'
import locationsReducer from './locationsSlice'
import devicesReducer from './devicesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    roles: rolesReducer,
    locations: locationsReducer,
    devices: devicesReducer,
  }
})
