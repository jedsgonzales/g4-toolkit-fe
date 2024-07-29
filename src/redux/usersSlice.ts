import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apolloClient } from "src/client/apollo";
import {
    GET_ALL_USERS,
} from "src/client/models/users";
import {
    //UserRole,
    UserWithRoles,
} from "src/client/types/graphql"

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1'

interface UsersState {
    //items: Array<Object>,
    //totalItems: number;
    data: {
        items: Array<UserWithRoles>
        totalItems: number
    }
    loading: boolean
    error: string | null
}

const initialState: UsersState = {
    //items: [],
    //totalItems: 0,
    //data: null,
    data: {
        items: [],
        totalItems: 0
    },
    loading: false,
    error: null,
}

/*
export const usersList = createAsyncThunk(
  'users/list',
  async (payload: any, thunkAPI) => {
    try {
      const searchParams = new URLSearchParams(payload || {})
      const token = localStorage.getItem('token') // address
      const response = await fetch(BACKEND_URL + '/users?' + searchParams, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      if (response.status === 200) {
        return json
      } else {
        return thunkAPI.rejectWithValue(json)
      }
    } catch (e: any) {
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
)
*/
export const usersList = createAsyncThunk(
    "users/list",
    async (payload: { search: string }, thunkAPI) => {
        return await apolloClient
            .query({
                query: GET_ALL_USERS,
                fetchPolicy: "network-only",
                variables: {
                    filter: payload.search,
                },
            })
            .then((resp) => {
                if (resp.errors) {
                    return thunkAPI.rejectWithValue(resp.errors);
                } else {
                    if (resp.data) {
                        return thunkAPI.fulfillWithValue({
                            ...resp.data,
                        });
                    } else {
                        return thunkAPI.rejectWithValue("Session Expired");
                    }
                }
            })
            .catch((err) => {
                console.log('error', err);
                return thunkAPI.rejectWithValue(err.message);
            });
    }
);


export const usersCreate = createAsyncThunk(
    'users/create',
    async (payload: { firstname: string, lastname: string }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(BACKEND_URL + '/users', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...payload
                })
            })
            const json = await response.json()
            if (response.status === 200) {
                return json
            } else {
                return thunkAPI.rejectWithValue(json)
            }
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const usersUpdate = createAsyncThunk(
    'users/update',
    async (payload: { id: string }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(BACKEND_URL + '/users/' + payload.id, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...payload
                })
            })
            const json = await response.json()
            if (response.status === 200) {
                return json
            } else {
                return thunkAPI.rejectWithValue(json)
            }
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const usersDelete = createAsyncThunk(
    'users/delete',
    async (payload: { id: string }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(BACKEND_URL + '/users/' + payload.id, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            const json = await response.json()
            if (response.status === 200) {
                return json
            } else {
                return thunkAPI.rejectWithValue(json)
            }
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const usersRead = createAsyncThunk(
    'users/read',
    async (payload: { id: string }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(BACKEND_URL + '/users/' + payload.id, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            const json = await response.json()
            if (response.status === 200) {
                return json
            } else {
                return thunkAPI.rejectWithValue(json)
            }
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        usersReset: (state) => {
            state = initialState
            return state
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(usersList.fulfilled, (state, { payload }) => {
                state.loading = false
                //state.data = payload
                state.data = {
                    items: payload.AllUsers,
                    totalItems: payload.AllUsers.length
                }
            })
            .addCase(usersList.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(usersList.rejected, (state, { error }) => {
                state.loading = false
                state.error = error.message || 'An error occurred'
            })
            .addCase(usersCreate.fulfilled, (state, { payload }) => {
                state.loading = false
                //state.data = payload
                state.data.items.push(payload)
            })
            .addCase(usersCreate.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(usersCreate.rejected, (state, { error }) => {
                state.loading = false
                state.error = error.message || 'An error occurred'
            })
            .addCase(usersUpdate.fulfilled, (state, { payload }) => {
                state.loading = false
                const objIndex = state.data.items.findIndex(((user: UserWithRoles) => user.Id === payload.id))
                if (objIndex > -1) {
                    state.data.items[objIndex] = payload
                }
            })
            .addCase(usersUpdate.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(usersUpdate.rejected, (state, { error }) => {
                state.loading = false
                state.error = error.message || 'An error occurred'
            })
            .addCase(usersDelete.fulfilled, (state, { payload }) => {
                state.loading = false
                const objIndex = state.data.items.findIndex(((user: UserWithRoles) => user.Id === payload.id))
                state.data.items.splice(objIndex, 1)
            })
            .addCase(usersDelete.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(usersDelete.rejected, (state, { error }) => {
                state.loading = false
                state.error = error.message || 'An error occurred'
            })
            .addCase(usersRead.fulfilled, (state, { payload }) => {
                state.loading = false
                // no need to save this, just access it directly
                //state.items = [payload]
                //return state
            })
            .addCase(usersRead.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(usersRead.rejected, (state, { error }) => {
                state.loading = false
                state.error = error.message || 'An error occurred'
            })
    }
})

export const { usersReset } = usersSlice.actions
export const users = (state: UsersState) => state.data

export default usersSlice.reducer
