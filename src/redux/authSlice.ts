import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1'

const initialState = {
  id: '',
  firstname: '',
  lastname: '',
  email: '',
  username: '',
  roles: [],
  avatarUrl: '',
  //createdAt: '',
  //updatedAt: '',

  languageId: 'en',
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
  async (payload:object, thunkAPI) => {
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
/*
export const googleLogin = createAsyncThunk(
  'google/login',
  async ({ googleToken }, thunkAPI) => {
    try {
      const response = await fetch(BACKEND_URL + '/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          googleToken: googleToken
        })
      })
      const json = await response.json()
      if (response.status === 200) {
        return json
      } else {
        return thunkAPI.rejectWithValue(json)
      }
    } catch (e: any) {
      console.log(e: any)
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
)
export const googleLink = createAsyncThunk(
  'google/link',
  async ({ googleToken }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(BACKEND_URL + '/auth/link', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          googleToken: googleToken
        })
      })
      const json = await response.json()
      if (response.status === 200) {
        return json
      } else {
        return thunkAPI.rejectWithValue(json)
      }
    } catch (e: any) {
      console.log(e: any)
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
)
*/

export const authValidate = createAsyncThunk(
  'auth/validate',
  async (payload: object, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return thunkAPI.rejectWithValue({ message: 'No token' })
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
    } catch (e: any) {
      thunkAPI.rejectWithValue(e.response.data)
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
    setLanguageId: (state, { payload }) => {
      state.languageId = payload
      return state
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(authRegister.fulfilled, (state, { payload }) => {
        state.message = payload?.message || 'Registered successfully'
        return state
      })
      .addCase(authRegister.pending, (state, { payload }) => {
      })
      .addCase(authRegister.rejected, (state, { payload }) => {
        throw new Error(payload?.message || 'Server error')
      })
      .addCase(authForgot.fulfilled, (state, { payload }) => {
        state.message = payload?.message || 'Reset successfully'
        return state
      })
      .addCase(authForgot.pending, (state, { payload }) => {
      })
      .addCase(authForgot.rejected, (state, { payload }) => {
        throw new Error(payload?.message || 'Server error')
      })
      .addCase(authLogin.fulfilled, (state, { payload }) => {
        if (payload) {
          localStorage.setItem('token', payload.token)
          state.message = payload?.message || 'Logged in successfully'
          return state
        }
        else {
          throw new Error('Invalid login')
        }
      })
      .addCase(authLogin.pending, (state, { payload }) => {
      })
      .addCase(authLogin.rejected, (state, { payload }) => {
        throw new Error(payload?.message || 'Server error')
      })
      /*
      .addCase(googleLogin.fulfilled, (state, { payload }) => {
        if (payload) {
          localStorage.setItem('token', payload.token)
          state.message = payload?.message || 'Logged in successfully'
          return state
        }
        else {
          throw new Error('Invalid login')
        }
      })
      .addCase(googleLogin.pending, (state, { payload }) => {
      })
      .addCase(googleLogin.rejected, (state, { payload }) => {
        throw new Error(payload?.message || 'Server error')
      })
      */
      .addCase(authLink.fulfilled, (state, { payload }) => {
      })
      .addCase(authLink.pending, (state, { payload }) => {
      })
      .addCase(authLink.rejected, (state, { payload }) => {
        throw new Error(payload?.message || 'Server error')
      })
      .addCase(authUnlink.fulfilled, (state, { payload }) => {
      })
      .addCase(authUnlink.pending, (state, { payload }) => {
      })
      .addCase(authUnlink.rejected, (state, { payload }) => {
        throw new Error(payload?.message || 'Server error')
      })
      .addCase(authValidate.fulfilled, (state, { payload }) => {
        if (payload) {
          state = { ...state, ...payload }
          return state
        }
        else {
          throw new Error('Invalid token')
        }
      })
      .addCase(authValidate.pending, (state, { payload }) => {
      })
      .addCase(authValidate.rejected, (state, { payload }) => {
        localStorage.removeItem('token')
        throw new Error(payload?.message || 'Not logged in')
      })
  }
})

export const { authReset, setLanguageId } = authSlice.actions
export const auth = (state) => state.auth

export default authSlice.reducer
