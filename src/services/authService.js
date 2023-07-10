import axios from 'axios'
import { toast } from 'react-toastify'

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

// Register user 
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData)

        // Throw notification if OK
        if(response.statusText === 'OK') {
            toast.success('User registered successfully')
        }

        return response.data
    }catch(error) {
        const message = (
            error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        toast.error(message)
    }
}

// Login user
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData)

        // Throw notification if OK
        if(response.statusText === 'OK') {
            toast.success('User logged in')
        }

        return response.data
    } catch(error) {
        const message = (
            error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        toast.error(message)
    }
}

// Get login status 
export const getLoginStatus = async() => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`)

        return response.data
    } catch(error) {
        const message = (
            error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        toast.error(message)
    }
}

// Logout user
export const logoutUser = async () => {
    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`)
    }catch(error) {
        const message = (
            error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        toast.error(message)
    }
}

// Forgot password
export const forgotPassword = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`, userData)
        
        toast.success(response.data.message)
    } catch(error) {
        const message = (
            error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        toast.error(message)
    }
}

// Reset password
export const resetPassword = async(userData, resetToken) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`, userData)

        return response.data
    }catch(error) {
        const message = (
            error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        toast.error(message)
    }
}

// Get User data
export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/getuser`)

        return response.data
    } catch(error) {
        const message = (
            error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        toast.error(message)
    }
}

// Update user
export const updateProfile = async (formData) => {
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/users/updateuser`, formData)

        return response.data
    }catch(error) {
        const message = (
            error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        toast.error(message)
    }
}

// Change password
export const changePassword = async (formData) => {
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/users/changepassword`, formData)

        return response.data
    }catch(error) {
    const message = (
        error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()

    toast.error(message)
    }
}