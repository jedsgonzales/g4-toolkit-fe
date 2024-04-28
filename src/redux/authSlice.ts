import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1'

interface AuthState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  //data: null,
  data: { id: '123-123456-1234', date: '2024-01-01', email: 'john@test.com', username: 'john_doe', firstname: 'John', lastname: 'Doe', roles: ['admin'] },
  loading: false,
  error: null,
}

// --- begin auth endpoints ---
export const authRegister = createAsyncThunk(
  'auth/register',
  async (payload: object, thunkAPI) => {
    try {
      const response = await fetch(BACKEND_URL + '/auth/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...payload
          })
        }
      )
      const json = await response.json()
      if (response.status === 200) {
        return json
      } else {
        return thunkAPI.rejectWithValue(json)
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const authForgot = createAsyncThunk(
  'auth/forgot',
  async (payload: object, thunkAPI) => {
    try {
      const response = await fetch(BACKEND_URL + '/auth/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const authLogin = createAsyncThunk(
  'auth/login',
  async (payload: object, thunkAPI) => {
    try {
      const response = await fetch(BACKEND_URL + '/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
export const authLink = createAsyncThunk(
  'auth/link',
  async (payload: object, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/auth/link', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
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
export const authUnlink = createAsyncThunk(
  'auth/unlink',
  async (payload: object, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/auth/unlink', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
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

export const authValidate = createAsyncThunk(
  'auth/validate',
  async () => {
    //console.log(payload)
    try {
      const token = localStorage.getItem('token')
      //if (!token) return thunkAPI.rejectWithValue({ message: 'No token' })
      const response = await fetch(BACKEND_URL + '/auth', {
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
        //return thunkAPI.rejectWithValue(json)
      }
    } catch (e: any) {
      //thunkAPI.rejectWithValue(e.response.data)
    }
  }
)
// --- end auths endpoints ---

// logout
//localStorage.removeItem('token')

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    authReset: (state) => {
      localStorage.removeItem('token')
      state = initialState
      return state
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(authRegister.fulfilled, (state, { payload }) => {
        state.loading = false
        state.data = payload
      })
      .addCase(authRegister.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(authRegister.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(authForgot.fulfilled, (state, { payload }) => {
        state.loading = false
        state.data = payload
      })
      .addCase(authForgot.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(authForgot.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })
      .addCase(authLogin.fulfilled, (state, { payload }) => {
        state.loading = false
        if (payload) {
          localStorage.setItem('token', payload.token)
          state.data = payload
        }
        else {
          //throw new Error('Invalid login')
          state.data = null
          state.error = 'Invalid login'
        }
      })
      .addCase(authLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(authLogin.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
      })

      .addCase(authValidate.fulfilled, (state, { payload }) => {
        if (payload) {
          state.data = { ...state.data, ...payload }
          //return state
        }
        else {
          throw new Error('Invalid token')
        }
      })
      .addCase(authValidate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(authValidate.rejected, (state, { error }) => {
        localStorage.removeItem('token')
        state.error = error.message || 'An error occurred'
      })
  }
})

export const { authReset } = authSlice.actions
export const auth = (state: AuthState) => state.data

export default authSlice.reducer
