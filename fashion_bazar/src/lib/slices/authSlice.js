import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: localStorage.getItem("token")
}



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        
        logout:(state)=>{
            state.token=null
            localStorage.removeItem("token")
        }




    }

})


export const { setCredentials,logout } = authSlice.actions
export default authSlice.reducer