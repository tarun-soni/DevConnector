import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS, AUTH_ERROR, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types'

import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'


//LOAD USER
export const loadUser = () => async dispatch => {
    //check if there's a token
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {

        console.error('error in loadUser', err)
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register USER
export const register = (dataFromUser) => async dispatch => {
    console.log('data', dataFromUser)
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // const body = JSON.stringify({ name, email, password })
    try {
        const res = await axios.post('/api/users', dataFromUser, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data //response.data is token coz we get token back after reg
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}


// LOGIN USER
export const login = (dataFromUser) => async dispatch => {
    // console.log('data', dataFromUser)
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // const body = JSON.stringify({ name, email, password })
    try {
        const res = await axios.post('/api/auth', dataFromUser, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data //response.data is token coz we get token back after reg
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

//Logout
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
};

