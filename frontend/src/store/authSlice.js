import { createSlice } from "@reduxjs/toolkit";
import {apiClient} from "../api/index.js";


const STATUS = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
    SUCCESS: "success",
})

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        isAuthenticated: localStorage.getItem("token") ? true : false,
        data: JSON.parse(localStorage.getItem("user")) || [], 
        loading: STATUS.IDLE,
        error: null,
        token: localStorage.getItem("token") || null,
        role: JSON.parse(localStorage.getItem("user"))?.role || "",
        
    },
   reducers: {
    setAuthenticated(state, action) {
        state.isAuthenticated = action.payload;
    },

    setUserData(state, action) {
        state.data = action.payload;
    },
    setLoading(state,action) {
        state.loading = action.payload;
    },
    setError(state, action) {
        state.error = action.payload;
   },
   setToken(state,action) {
    state.token = action.payload;
   },
    setRole(state,action) {
        state.role = action.payload;
    },
   logoutUser(state) {
    state.isAuthenticated = false;
    state.data = null;
    state.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
   },
 
   
}
})

export const { setAuthenticated, setUserData, setLoading, setError, setToken ,logoutUser, setRole,setStatus} = authSlice.actions;

export default authSlice.reducer;

export function registerUser(userData) {
    return async function resgisterUserThunk(dispatch) {
        dispatch(setLoading(STATUS.LOADING));   
        
        if(!userData.email || !userData.password || !userData.name) {
            dispatch(setError("All fields are required"));
            dispatch(setLoading(STATUS.ERROR));
            alert("All fields are required");
            return;
        }
        try {
            const res = await apiClient.post('/auth/register',userData);

            if(res.status === 201) {
                dispatch(setUserData(res.data));
                alert("Registration Successful! Please Login.");
            }
            else {
                dispatch(setError("Registration Failed"));
                dispatch(setLoading(STATUS.ERROR));
            }
        } catch (error) {
            dispatch(setError(error.res?.data?.message || "Registration Failed"));
            dispatch(setLoading(STATUS.ERROR));
        }   
    }

}

export function loginUser(data) {
    return async function loginUserThunk(dispatch) {
        dispatch(setLoading(STATUS.LOADING));
    if(!data.email || !data.password) {
       dispatch(setLoading(STATUS.ERROR));
       dispatch(setError("Please provide all the details"));
       alert("Please provide all the details");
       return;
    }
    try {
        const res = await apiClient.post('/auth/login',data);
        if (res.status === 200) {
            alert("Login Successful!");
            // Backend returns user and token directly
            const user = res.data.user;
            const token = res.data.data;
            dispatch(setUserData(user));
            dispatch(setToken(token));
            dispatch(setAuthenticated(true));
            dispatch(setRole(user.role));
            dispatch(setLoading(STATUS.SUCCESS));
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
           
            
        } else {
            alert("Login failed! Please check your credentials");
            dispatch(setLoading(STATUS.ERROR));
            dispatch(setError("login failed"));
        }
    }
    catch(err) {
        dispatch(setError(err.response?.data?.message || "Something went wrong"));
        dispatch(setLoading(STATUS.ERROR));
        alert(err.response?.data?.message || "Something went wrong");
    }
    }
}


