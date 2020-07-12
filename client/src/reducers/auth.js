import { REGISTER_FAIL, REGISTER_SUCESS } from '../actions/types'

const initialState = {

}
export default function (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case REGISTER_SUCESS:
            localStorage.getItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }

}