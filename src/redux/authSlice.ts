import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apolloClient } from 'src/client/apollo'
import { AUTHENTICATE, GET_AUTH_KEY, VALIDATE_TOKEN } from 'src/client/models/auth'
import { GetLoginKeyMutation, GetLoginKeyMutationVariables, SignInMutation, SignInMutationVariables, ValidateAuthQuery, ValidateAuthQueryVariables } from 'src/client/types/graphql'
import { delStorageObject, getSessionId, saveStorageObject } from 'src/utils/storage'
import { roles } from './rolesSlice'

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1'

type AuthType = {
  key?: String
  token?: String
  id?: String
  date?: String
  email?: String
  username?: String
  firstname?: String
  lastname?: String
  roles?: { Id: string, RoleName: string }[]
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


export const authKey = createAsyncThunk(
  'auth/key',
  async (username: string, thunkAPI) => {
    try {
      return await apolloClient.query<GetLoginKeyMutation, GetLoginKeyMutationVariables>({
        query: GET_AUTH_KEY,
        fetchPolicy: 'network-only',
        variables: {
          username,
        }
      })
      .then((resp) => {
        if(resp.error) {
          return thunkAPI.rejectWithValue(resp.error)
        } else if(resp.errors) {
          return thunkAPI.rejectWithValue(resp.errors)
        } else {
          return thunkAPI.fulfillWithValue({
            key: resp.data.GetLoginKey
          })
        }
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue(err.message)
      });
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const authLogin = createAsyncThunk(
  'auth/login',
  async (payload: { username: string, password: string }, thunkAPI) => {
    return await apolloClient.query<SignInMutation, SignInMutationVariables>({
      query: AUTHENTICATE,
      fetchPolicy: 'network-only',
      variables: {
        username: payload.username,
        key: payload.password,
      }
    })
    .then((resp) => {
      if(resp.error) {
        return thunkAPI.rejectWithValue(resp.error)
      } else if(resp.errors) {
        return thunkAPI.rejectWithValue(resp.errors)
      } else {
        return thunkAPI.fulfillWithValue({
          token: resp.data.SignIn.AccessToken,
          id: resp.data.SignIn.User.Id,
          date: resp.data.SignIn.User.CreatedOn,
          email: resp.data.SignIn.User.Email,
          username: resp.data.SignIn.User.Username,
          firstname: resp.data.SignIn.User.FirstName || '',
          lastname: resp.data.SignIn.User.LastName || '',
          roles: resp.data.SignIn.User.Roles?.map(role => ({
            Id: role.Id,
            RoleName: role.RoleName
          })) || []
        })
      }
    })
    .catch((err) => {
      return thunkAPI.rejectWithValue(err.message)
    });
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
    return await apolloClient.query<ValidateAuthQuery, ValidateAuthQueryVariables>({
      query: VALIDATE_TOKEN,
      fetchPolicy: 'network-only',
    })
    .then((resp) => {
      if(resp.error) {
        return thunkAPI.rejectWithValue(resp.error)
      } else if(resp.errors) {
        return thunkAPI.rejectWithValue(resp.errors)
      } else {
        const token = getSessionId();
        return thunkAPI.fulfillWithValue({
          token: token || '',
          id: resp.data.ValidateAuth.Id,
          date: resp.data.ValidateAuth.CreatedOn,
          email: resp.data.ValidateAuth.Email,
          username: resp.data.ValidateAuth.Username,
          firstname: resp.data.ValidateAuth.FirstName || '',
          lastname: resp.data.ValidateAuth.LastName || '',
          roles: resp.data.ValidateAuth.Roles?.map(role => ({
            Id: role.Id,
            RoleName: role.RoleName
          })) || []
        })
      }
    })
    .catch((err) => {
      return thunkAPI.rejectWithValue(err.message)
    });
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
      delStorageObject('auth')
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
      .addCase(authKey.fulfilled, (state, { payload }) => {
        state.loading = false
        state.data = payload
      })
      .addCase(authKey.rejected, (state, { payload }) => {
        state.loading = false
        state.data = undefined
        state.error = (payload as any).toString()
      })
      .addCase(authKey.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(authLogin.fulfilled, (state, { payload }) => {
        state.loading = false
        if (payload) {
          saveStorageObject('auth', payload);
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
