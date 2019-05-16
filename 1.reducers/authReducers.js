import {LOGIN_SUCCESS} from '../3.support/Constant/type'

const INITIAL_STATE = {uid : null , email : '' , password : ''}

const authReducers = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LOGIN_SUCCESS :
            return {...INITIAL_STATE , uid : action.payload.uid , email : action.payload.email}
        case 'RESGITER_SUCCESS' :
            return {...INITIAL_STATE , email : action.payload}
        default :
            return INITIAL_STATE
    }
}

export default authReducers