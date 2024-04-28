import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1'

interface RolesState {
  //items: Array<Object>,
  //totalItems: number;
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: RolesState = {
  //items: [],
  //totalItems: 0,
  //data: null,
  data: {
    items: [
      { id: '1', name: 'admin' },
      { id: '2', name: 'user' },
    ],
    totalItems: 2
  },
  loading: false,
  error: null,
}

export const rolesList = createAsyncThunk(
  'roles/list',
  async (payload: any, thunkAPI) => {
    try {
      const searchParams = new URLSearchParams(payload || {})
      const token = localStorage.getItem('token') // address
      const response = await fetch(BACKEND_URL + '/roles?' + searchParams, {
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

export const rolesCreate = createAsyncThunk(
  'roles/create',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/roles', {
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

export const rolesUpdate = createAsyncThunk(
  'roles/update',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/roles/' + payload.id, {
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

export const rolesDelete = createAsyncThunk(
  'roles/delete',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/roles/' + payload.id, {
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

export const rolesRead = createAsyncThunk(
  'roles/read',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/roles/' + payload.id, {
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

export const rolesDownload = createAsyncThunk(
  'roles/download',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/roles/excel', {
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
        a.download = "roles.xlsx"
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

export const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    rolesReset: (state) => {
      state = initialState
      return state
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(rolesList.fulfilled, (state, { payload }) => {
        state.loading = false
        state.data = payload
      })
      .addCase(rolesList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(rolesList.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(rolesCreate.fulfilled, (state, { payload }) => {
        state.loading = false
        //state.data = payload
        state.data.items.push(payload)
      })
      .addCase(rolesCreate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(rolesCreate.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(rolesUpdate.fulfilled, (state, { payload }) => {
        state.loading = false
        const objIndex = state.data.items.findIndex(((obj: any) => obj.id === payload.id))
        if (objIndex > -1) {
          state.data.items[objIndex] = payload
        }
      })
      .addCase(rolesUpdate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(rolesUpdate.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(rolesDelete.fulfilled, (state, { payload }) => {
        state.loading = false
        const objIndex = state.data.items.findIndex(((obj: any) => obj.id === payload.id))
        state.data.items.splice(objIndex, 1)
      })
      .addCase(rolesDelete.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(rolesDelete.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(rolesRead.fulfilled, (state, { payload }) => {
        state.loading = false
        // no need to save this, just access it directly
        //state.items = [payload]
        //return state
      })
      .addCase(rolesRead.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(rolesRead.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(rolesDownload.fulfilled, (state, { payload }) => {
        state.loading = false
      })
      .addCase(rolesDownload.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(rolesDownload.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
  }
})

export const { rolesReset } = rolesSlice.actions
export const roles = (state: RolesState) => state.data

export default rolesSlice.reducer
