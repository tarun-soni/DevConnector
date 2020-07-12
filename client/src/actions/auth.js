import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCESS } from './types'

import { setAlert } from './alert'
//Register USER

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
            type: REGISTER_SUCESS,
            payload: res.data //response.data is token coz we get token back after reg
        })

    } catch (err) {

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error =>
                dispatch(setAlert(error.msg, 'danger'))
            );
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }

}