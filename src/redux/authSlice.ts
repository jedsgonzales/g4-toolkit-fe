import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1'

type AuthType = {
  token?: String
  id?: String
  date?: String
  email?: String
  username?: String
  firstname?: String
  lastname?: String
}

interface AuthState extends Object {
  data?: AuthType
  loading: boolean
  error?: string
}

const TestData = [
  { id: '123-123456-1234', date: '2024-01-01', email: 'admin@g4.com', username: 'admin_g4', firstname: 'Admin', lastname: 'Account', roles: ['admin'], token: '12345678901' },
  { id: '123-123456-1235', date: '2024-01-02', email: 'user@g4.com', username: 'user_g4', firstname: 'User', lastname: 'Account', roles: ['user'], token: '12345678902' },
]

const initialState: AuthState = {
  data: undefined,
  loading: false,
  error: undefined,
}

// --- begin auth endpoints ---
export const authRegister = createAsyncThunk(
  'auth/register',
  async (payload: Object, thunkAPI) => {
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
  async (payload: Object, thunkAPI) => {
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
  async (payload: { email: String, password: String }, thunkAPI) => {
    console.log('login: ' + payload)
    //try {
    /* 
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
    */
    // for testing
    const user = TestData.find(obj => obj.email == payload.email)
    if (user)
      return {
        token: user.token,
      }
    return thunkAPI.rejectWithValue({ message: 'login failed' })
    //} catch (e: any) {
    //  ZthunkAPI.rejectWithValue(e.response.data)
    //}
  }
)
export const authLink = createAsyncThunk(
  'auth/link',
  async (payload: Object, thunkAPI) => {
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
  async (payload: Object, thunkAPI) => {
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
  async (payload: { token?: String }, thunkAPI) => {
    console.log(payload)
    //try {
    const token = localStorage.getItem('token')
    //if (!token) return thunkAPI.rejectWithValue({ message: 'No token' })
    /*
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
    return thunkAPI.rejectWithValue(json)
  }
  */
    // for testing
    const user = TestData.find(obj => obj.token == token)
    if (user)
      return {
        id: user?.id,
        date: user?.date,
        email: user?.email,
        username: user?.username,
        firstname: user?.firstname,
        lastname: user?.lastname,
        roles: user?.roles,
      }
    return thunkAPI.rejectWithValue({ message: 'login failed' })
    //} catch (e: any) {
    //  thunkAPI.rejectWithValue(e.response.data)
    //}
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
        state.error = undefined
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
        state.error = undefined
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
          console.log(payload)
        }
        else {
          //throw new Error('Invalid login')
          state.data = undefined
          state.error = 'Invalid login'
        }
      })
      .addCase(authLogin.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(authLogin.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'An error occurred'
        throw new Error('invalid login')
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
        state.error = undefined
      })
      .addCase(authValidate.rejected, (state, { error }) => {
        localStorage.removeItem('token')
        state.error = error.message || 'An error occurred'
        throw new Error('invalid token')
      })
  }
})

export const { authReset } = authSlice.actions
export const auth = (state: AuthState) => state.data

export default authSlice.reducer
