import {LOGIN_SUCCESS} from '../3.support/Constant/type'

export const onLoginSuccess = (email, uid) => {
    return{
        type : LOGIN_SUCCESS,
        payload : {email , uid}
    }
}

export const onLogin = (email,password) => {
    return{
        type : 'LOGIN_SUCCESS',
        payload : {email,password}
    }
}