import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoggedInDetails: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        userLoggedOutDetails: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        }
    },
});

export const { userLoggedInDetails, 
            userLoggedOutDetails} = userSlice.actions;
export default userSlice.reducer;