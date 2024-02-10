import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: false,
    reducers: {
        setAuth: (state, {payload}) => payload 
    }
})