import {createSlice} from "@reduxjs/toolkit"


const authSlice = createSlice({
    // Initial State
    name:"auth",
    initialState:{
        user: JSON.parse(localStorage.getItem("userInfo")) || null,
    },
    // reducers
    reducers:{
        // login
        loginAction:(state, action)=>{
                state.user = action.payload
        },
        // logout 
        logoutAction:(state, action)=>{
            // remove user from localstorage
            localStorage.removeItem("userInfo")
                state.user = null;
        }
    }
});

// Generate the actions using createSlice
export const {loginAction, logoutAction} = authSlice.actions;
// Generate reducers
const authReducer = authSlice.reducer;
export default authReducer;