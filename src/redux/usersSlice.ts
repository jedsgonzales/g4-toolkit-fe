import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1'

type UserType = {
  id?: String
  date?: String
  email?: String
  username?: String
  firstname?: String
  lastname?: String
}

interface UsersState {
  //items: Array<Object>,
  //totalItems: number;
  data: {
    items: Array<UserType>
    totalItems: Number
  };
  loading: boolean;
  error: string | null;
}

const TestData = [
  { id: '123-123456-1234', date: '2024-01-01', email: 'admin@g4.com', username: 'admin_g4', firstname: 'Admin', lastname: 'Account', roles: ['admin'] },
  { id: '123-123456-1235', date: '2024-01-02', email: 'user@g4.com', username: 'user_g4', firstname: 'User', lastname: 'Account', roles: ['user'] },
]

const initialState: UsersState = {
  //items: [],
  //totalItems: 0,
  //data: null,
  data: {
    items: TestData,
    totalItems: TestData.length
  },
  loading: false,
  error: null,
}

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

export const usersCreate = createAsyncThunk(
  'users/create',
  async (payload: any, thunkAPI) => {
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
  async (payload: any, thunkAPI) => {
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
  async (payload: any, thunkAPI) => {
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
  async (payload: any, thunkAPI) => {
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

export const usersDownload = createAsyncThunk(
  'users/download',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/users/excel', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      let blob = await response.blob()
      if (response.status === 200) {
        const file = window.URL.createObjectURL(blob)
        //window.location.assign(file)
        var a = document.createElement('a')
        a.href = file;
        a.download = "users.xlsx"
        document.body.appendChild(a)
        a.click()
        a.remove()
        return { message: 'success' }
      } else {
        return thunkAPI.rejectWithValue({ message: `error code: ${response.status}` })
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
        state.data = payload
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
        const objIndex = state.data.items.findIndex(((obj: any) => obj.id === payload.id))
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
        const objIndex = state.data.items.findIndex(((obj: any) => obj.id === payload.id))
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
      .addCase(usersDownload.fulfilled, (state, { payload }) => {
        state.loading = false
      })
      .addCase(usersDownload.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(usersDownload.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
  }
})

export const { usersReset } = usersSlice.actions
export const users = (state: UsersState) => state.data

export default usersSlice.reducer
