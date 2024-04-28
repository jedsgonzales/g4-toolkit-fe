import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1'

interface LocationsState {
  //items: Array<Object>,
  //totalItems: number;
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: LocationsState = {
  //items: [],
  //totalItems: 0,
  //data: null,
  data: {
    items: [
      { id: '1', date: '2024-01-01', name: 'room 1' },
      { id: '2', date: '2024-01-01', name: 'room 2' },
      { id: '3', date: '2024-01-01', name: 'room 3' },
      { id: '4', date: '2024-01-01', name: 'kitchen 1' },
      { id: '5', date: '2024-01-01', name: 'kitchen 2' },
    ],
    totalItems: 5
  },
  loading: false,
  error: null,
}

export const locationsList = createAsyncThunk(
  'locations/list',
  async (payload: any, thunkAPI) => {
    try {
      const searchParams = new URLSearchParams(payload || {})
      const token = localStorage.getItem('token') // address
      const response = await fetch(BACKEND_URL + '/locations?' + searchParams, {
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

export const locationsCreate = createAsyncThunk(
  'locations/create',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/locations', {
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

export const locationsUpdate = createAsyncThunk(
  'locations/update',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/locations/' + payload.id, {
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

export const locationsDelete = createAsyncThunk(
  'locations/delete',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/locations/' + payload.id, {
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

export const locationsRead = createAsyncThunk(
  'locations/read',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/locations/' + payload.id, {
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

export const locationsDownload = createAsyncThunk(
  'locations/download',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/locations/excel', {
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
        a.download = "locations.xlsx"
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

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    locationsReset: (state) => {
      state = initialState
      return state
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(locationsList.fulfilled, (state, { payload }) => {
        state.loading = false
        state.data = payload
      })
      .addCase(locationsList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(locationsList.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(locationsCreate.fulfilled, (state, { payload }) => {
        state.loading = false
        //state.data = payload
        state.data.items.push(payload)
      })
      .addCase(locationsCreate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(locationsCreate.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(locationsUpdate.fulfilled, (state, { payload }) => {
        state.loading = false
        const objIndex = state.data.items.findIndex(((obj: any) => obj.id === payload.id))
        if (objIndex > -1) {
          state.data.items[objIndex] = payload
        }
      })
      .addCase(locationsUpdate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(locationsUpdate.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(locationsDelete.fulfilled, (state, { payload }) => {
        state.loading = false
        const objIndex = state.data.items.findIndex(((obj: any) => obj.id === payload.id))
        state.data.items.splice(objIndex, 1)
      })
      .addCase(locationsDelete.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(locationsDelete.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(locationsRead.fulfilled, (state, { payload }) => {
        state.loading = false
        // no need to save this, just access it directly
        //state.items = [payload]
        //return state
      })
      .addCase(locationsRead.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(locationsRead.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(locationsDownload.fulfilled, (state, { payload }) => {
        state.loading = false
      })
      .addCase(locationsDownload.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(locationsDownload.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
  }
})

export const { locationsReset } = locationsSlice.actions
export const locations = (state: LocationsState) => state.data

export default locationsSlice.reducer
