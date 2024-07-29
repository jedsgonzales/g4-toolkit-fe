import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { apolloClient } from "src/client/apollo";
import {
    AUTHENTICATE,
    GET_AUTH_KEY,
    VALIDATE_TOKEN,
} from "src/client/models/auth";
import {
    GetLoginKeyMutation,
    GetLoginKeyMutationVariables,
    SignInMutation,
    SignInMutationVariables,
    ValidateAuthQuery,
    ValidateAuthQueryVariables,
} from "src/client/types/graphql";
import {
    delStorageObject,
    loadStorageObject,
    saveStorageObject
} from "src/utils/storage";
/* import { roles } from './rolesSlice' */


type AuthDataStore = {
    key?: string;
    token?: string;
    validationMark?: string;
    id?: string;
    date?: string;
    email?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    roles?: { Id: string; RoleName: string }[];
};

export interface AuthState {
    data?: AuthDataStore;
    loading: boolean;
    validating: boolean;
    error?: string;
}

const initialState: AuthState = {
    data: loadStorageObject("auth"),
    loading: false,
    validating: false,
    error: undefined,
};

// --- begin auth endpoints ---
export const authKey = createAsyncThunk(
    "auth/key",
    async (username: string, thunkAPI) => {
        return await apolloClient
            .mutate<GetLoginKeyMutation, GetLoginKeyMutationVariables>({
                mutation: GET_AUTH_KEY,
                fetchPolicy: "network-only",
                variables: {
                    username,
                },
            })
            .then((resp) => {
                const { errors, data } = resp;
                if (errors) {
                    return thunkAPI.rejectWithValue(errors);
                } else {
                    return thunkAPI.fulfillWithValue({
                        key: data?.GetLoginKey,
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                return thunkAPI.rejectWithValue(err.message);
            });
    }
);

export const authLogin = createAsyncThunk(
    "auth/login",
    async (payload: { username: string; password: string }, thunkAPI) => {
        return await apolloClient
            .mutate<SignInMutation, SignInMutationVariables>({
                mutation: AUTHENTICATE,
                fetchPolicy: "network-only",
                variables: {
                    username: payload.username,
                    key: payload.password,
                },
            })
            .then((resp) => {
                const { errors, data } = resp;
                if (errors) {
                    return thunkAPI.rejectWithValue(errors);
                } else {
                    const timeFrame = DateTime.local()
                        .startOf("hour")
                        .toFormat("yyyyMMddHHmmss");

                    return thunkAPI.fulfillWithValue({
                        token: data?.SignIn.AccessToken,
                        id: data?.SignIn.User.Id,
                        date: data?.SignIn.User.CreatedOn,
                        email: data?.SignIn.User.Email,
                        username: data?.SignIn.User.Username,
                        firstname: data?.SignIn.User.FirstName || "",
                        lastname: data?.SignIn.User.LastName || "",
                        roles:
                            data?.SignIn.User.Roles?.map((role) => ({
                                Id: role.Id,
                                RoleName: role.RoleName,
                            })) || [],
                        validationMark: timeFrame,
                    });
                }
            })
            .catch((err) => {
                return thunkAPI.rejectWithValue(err.message);
            });
    }
);

export const authValidate = createAsyncThunk(
    "auth/validate",
    async (payload: { token: string; validationCode: string }, thunkAPI) => {
        return await apolloClient
            .query<ValidateAuthQuery, ValidateAuthQueryVariables>({
                query: VALIDATE_TOKEN,
                fetchPolicy: "network-only",
            })
            .then((resp) => {
                if (resp.errors) {
                    return thunkAPI.rejectWithValue(resp.errors);
                } else {
                    if (resp.data.ValidateAuth) {
                        return thunkAPI.fulfillWithValue({
                            token: payload.token,
                            id: resp.data.ValidateAuth.Id,
                            date: resp.data.ValidateAuth.CreatedOn,
                            email: resp.data.ValidateAuth.Email,
                            username: resp.data.ValidateAuth.Username,
                            firstname: resp.data.ValidateAuth.FirstName || "",
                            lastname: resp.data.ValidateAuth.LastName || "",
                            roles:
                                resp.data.ValidateAuth.Roles?.map((role) => ({
                                    Id: role.Id,
                                    RoleName: role.RoleName,
                                })) || [],
                            validationMark: payload.validationCode,
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
// --- end auths endpoints ---

// logout
//localStorage.removeItem('token')

export const authSlice = createSlice({
    name: "auth",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        authReset: (state) => {
            delStorageObject("auth");
            state = initialState;
            return state;
        },
        authValidating: (state, action: PayloadAction<boolean>) => {
            return { ...state, validating: action.payload };
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(authKey.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
            })
            .addCase(authKey.rejected, (state, { payload }) => {
                state.loading = false;
                state.data = undefined;
                console.error(payload);
                //state.error = (payload as any).toString();
            })
            .addCase(authKey.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(authLogin.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (payload) {
                    saveStorageObject("auth", payload);
                    state.data = payload;
                    //console.log(payload);
                } else {
                    //throw new Error('Invalid login')
                    state.data = undefined;
                    state.error = "Invalid login";
                }
            })
            .addCase(authLogin.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(authLogin.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message || "An error occurred";
                throw new Error("invalid login");
            })

            .addCase(authValidate.fulfilled, (state, { payload }) => {
                if (payload) {
                    saveStorageObject("auth", payload);
                    state.data = { ...state.data, ...payload };

                    //return state
                } else {
                    // throw new Error('Invalid token')
                    delStorageObject("auth");
                    state.data = undefined;
                }

                state.validating = false;
                state.loading = false;
            })
            .addCase(authValidate.pending, (state) => {
                state.loading = true;
                state.validating = true;
                state.error = undefined;
            })
            .addCase(authValidate.rejected, (state, { error }) => {
                delStorageObject("auth");
                state.data = undefined;
                state.error = error.message || "An error occurred";
                state.validating = false;
                state.loading = false
                // throw new Error('invalid token')
            });
    },
});

export const { authReset, authValidating } = authSlice.actions;
export const auth = (state: AuthState) => state.data;

export default authSlice.reducer;
