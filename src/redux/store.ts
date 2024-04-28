import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import usersReducer from './usersSlice'
import rolesReducer from './rolesSlice'

export const store = configureStore({
  reducer: {
    //event: eventsReducer,
    auth: authReducer,
    users: usersReducer,
    roles: rolesReducer,
    /*
    stats: statsReducer,
    contents: contentsReducer,
    lotteries: lotteriesReducer,
    tickets: ticketsReducer,
    draws: drawsReducer,
    snapshots: snapshotsReducer,
    transactions: transactionsReducer,
    distributors: distributorsReducer,
    vouchers: vouchersReducer,
    lotty: lottyReducer,
 
    orders: ordersReducer,
    */
  }
})
