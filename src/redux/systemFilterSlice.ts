import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1'

type DeviceType = {
  id?: String
  date?: String
  name?: String
  details?: String
  isOccupied?: Boolean
  //devices?: Array<DeviceType>
}

interface DevicesState {
  //items: Array<Object>,
  //totalItems: number
  data: {
    items: Array<DeviceType>
    totalItems: Number
  }
  loading: boolean
  error: string | null
}

const TestData = [
  { id: '1', date: '2024-01-01', name: 'Relay', deviceId: '0001', deviceType: 'relay', description: 'This is a relay', value: 0, min: 0, max: 1, unit: '' },
  { id: '2', date: '2024-01-01', name: 'Switch', deviceId: '0002', deviceType: 'switch', description: 'This is a switch', value: 1, min: 0, max: 1, unit: '' },
  { id: '3', date: '2024-01-01', name: 'Dimmer', deviceId: '0003', deviceType: 'dimmer', description: 'This is a dimmer', value: 73, min: 0, max: 100, unit: '%' },
  { id: '4', date: '2024-01-01', name: 'Motion', deviceId: '0004', deviceType: 'motion', description: 'This is a motion sensor', value: 0, min: 0, max: 1, unit: '' },
  { id: '5', date: '2024-01-01', name: 'Energy', deviceId: '0005', deviceType: 'energy', description: 'This is an energy sensor', value: 0.5, min: 0, max: 100, unit: 'kw' },
]

const initialState: DevicesState = {
  data: {
    items: TestData,
    totalItems: TestData.length
  },
  loading: false,
  error: null,
}

export const devicesList = createAsyncThunk(
  'devices/list',
  async (payload: any, thunkAPI) => {
    try {
      const searchParams = new URLSearchParams(payload || {})
      const token = localStorage.getItem('token') // address
      const response = await fetch(BACKEND_URL + '/devices?' + searchParams, {
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

export const devicesCreate = createAsyncThunk(
  'devices/create',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/devices', {
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

export const devicesUpdate = createAsyncThunk(
  'devices/update',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/devices/' + payload.id, {
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

export const devicesDelete = createAsyncThunk(
  'devices/delete',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/devices/' + payload.id, {
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

export const devicesRead = createAsyncThunk(
  'devices/read',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/devices/' + payload.id, {
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

export const devicesDownload = createAsyncThunk(
  'devices/download',
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/devices/excel', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      let blob = await response.blob()
      if (response.status === 200) {
        const file = window.URL.createObjectURL(blob)
        //window.device.assign(file)
        var a = document.createElement('a')
        a.href = file
        a.download = "devices.xlsx"
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

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    devicesReset: (state) => {
      state = initialState
      return state
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(devicesList.fulfilled, (state, { payload }) => {
        state.loading = false
        state.data = payload
      })
      .addCase(devicesList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(devicesList.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(devicesCreate.fulfilled, (state, { payload }) => {
        state.loading = false
        //state.data = payload
        state.data.items.push(payload)
      })
      .addCase(devicesCreate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(devicesCreate.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(devicesUpdate.fulfilled, (state, { payload }) => {
        state.loading = false
        const objIndex = state.data.items.findIndex(((obj: any) => obj.id === payload.id))
        if (objIndex > -1) {
          state.data.items[objIndex] = payload
        }
      })
      .addCase(devicesUpdate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(devicesUpdate.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(devicesDelete.fulfilled, (state, { payload }) => {
        state.loading = false
        const objIndex = state.data.items.findIndex(((obj: any) => obj.id === payload.id))
        state.data.items.splice(objIndex, 1)
      })
      .addCase(devicesDelete.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(devicesDelete.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(devicesRead.fulfilled, (state, { payload }) => {
        state.loading = false
        // no need to save this, just access it directly
        //state.items = [payload]
        //return state
      })
      .addCase(devicesRead.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(devicesRead.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(devicesDownload.fulfilled, (state, { payload }) => {
        state.loading = false
      })
      .addCase(devicesDownload.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(devicesDownload.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
  }
})

export const { devicesReset } = devicesSlice.actions
export const devices = (state: DevicesState) => state.data

export default devicesSlice.reducer
