import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BACKEND_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api/v1'

const initialState = []

export const usersList = createAsyncThunk(
    'users/list',
    async (thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `query {
            listUsers {
              items {
                id
                email
                firstname
                lastname
                role
                createdAt
                updatedAt
              }
            }
          }`
                })
            })
            let data = await response.json()
            if (response.status === 200) {
                return data
            } else {
                return thunkAPI.rejectWithValue(data)
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const usersCreate = createAsyncThunk(
    'users/create',
    async (payload, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `mutation {
              createUser(input: {
                email: "${payload.email}"
                firstname: "${payload.firstname}"
                lastname: "${payload.lastname}"
                role: ${payload.role}
              }) {
                id
                email
                firstname
                lastname
                role
                createdAt
                updatedAt
              }
          }`
                }),
            }
            )
            let data = await response.json()
            //console.log(data)
            if (response.status === 200) {
                return data
            } else {
                return thunkAPI.rejectWithValue(data)
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const usersUpdate = createAsyncThunk(
    'users/update',
    async (payload, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `mutation {
              updateUser(input: {
                id: "${payload.id}"
                email: "${payload.email}"
                firstname: "${payload.firstname}"
                lastname: "${payload.lastname}"
                role: ${payload.role}
              }) {
                id
                email
                firstname
                lastname
                role
                createdAt
                updatedAt
              }
          }`
                }),
            }
            )
            let data = await response.json()
            if (response.status === 200) {
                return data
            } else {
                return thunkAPI.rejectWithValue(data)
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const usersDelete = createAsyncThunk(
    'users/delete',
    async (payload, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `mutation {
              deleteUser(input: {
                id: "${payload.id}"
              }) {
                id
              }
          }`
                }),
            }
            )
            let data = await response.json()
            if (response.status === 200) {
                return data
            } else {
                return thunkAPI.rejectWithValue(data)
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        reducers: {
            usersReset: (state) => {
                state = []
                return state
            },
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(usersList.fulfilled, (state, { payload }) => {
                state = payload.data.listUsers.items
                return state
            })
            .addCase(usersList.pending, (state, { payload }) => {
            })
            .addCase(usersList.rejected, (state, { payload }) => {
                throw new Error(payload?.errors || 'Server error')
            })
            .addCase(usersCreate.fulfilled, (state, { payload }) => {
                state.push(payload.data.createUser)
                return state
            })
            .addCase(usersCreate.pending, (state, { payload }) => {
            })
            .addCase(usersCreate.rejected, (state, { payload }) => {
                throw new Error(payload?.errors || 'Server error')
            })
            .addCase(usersUpdate.fulfilled, (state, { payload }) => {
                const objIndex = state.findIndex((obj => obj.id === payload.data.updateUser.id))
                if (objIndex > -1) {
                    state[objIndex] = payload.data.updateUser
                }
                return state
            })
            .addCase(usersUpdate.pending, (state, { payload }) => {
            })
            .addCase(usersUpdate.rejected, (state, { payload }) => {
                throw new Error(payload?.errors || 'Server error')
            })
            .addCase(usersDelete.fulfilled, (state, { payload }) => {
                const objIndex = state.findIndex((obj => obj.id === payload.data.deleteUser.id))
                state.splice(objIndex, 1)
                return state
            })
            .addCase(usersDelete.pending, (state, { payload }) => {
            })
            .addCase(usersDelete.rejected, (state, { payload }) => {
                throw new Error(payload?.errors || 'Server error')
            })
    }
})

export const { usersReset } = usersSlice.actions
export const users = (state) => state.users

export default usersSlice.reducer
