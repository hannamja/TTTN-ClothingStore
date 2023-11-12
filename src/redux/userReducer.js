import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk('user/login', async (data, { rejectWithValue }) => {

    const res = await fetch('http://localhost:8081/api/auth/signin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const user = await res.json()
    if (user?.email == null) return {}

    const listRole = user.ctQuyens.reduce((arr, cur) => { arr.push(cur.quyen.maquyen); return arr }, [])
    const newState = { matk: user.matk, info: { khachhang: user.khachhang, nhanvien: user.nhanvien, role: listRole }, token: user.accessToken }
    return newState
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