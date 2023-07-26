import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk('user/login', async (data, { rejectWithValue }) => {
    const user = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ info: { userName: 'thanh hung', role: 0 }, token: '123' })
        }, 1000)
    })
    return user
})

const initialState = {}
export const userReducer = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logout: (state, action) => {
            state = {}
            return state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state = {}
            return state
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state = action.payload
            return state
        })
        builder.addCase(login.rejected, (state, action) => {
            state = {}
            return state
        })
    },

})
export const { logout } = userReducer.actions
export default userReducer.reducer