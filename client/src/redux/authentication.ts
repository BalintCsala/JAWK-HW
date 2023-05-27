import {createSlice} from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        token: localStorage?.getItem("token") ?? null,
        username: localStorage?.getItem("username") ?? null,
        name: localStorage?.getItem("name") ?? null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.username = null;
            state.name = null;
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("name");
        },
        login: (state, action: {payload: {token: string, username: string, name: string}}) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.name = action.payload.name;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("username", action.payload.username);
            localStorage.setItem("name", action.payload.name);
        },
    },
});

export const {logout, login} = authenticationSlice.actions;
export default authenticationSlice.reducer;