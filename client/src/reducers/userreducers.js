import {USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT} from "../constants/SigninConstants";

export const UserReducer=(state={UserInfo:{},error:null,loading:true},action)=>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading:true};
        case USER_SIGNIN_SUCCESS:
            return {loading:false, UserInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading:false, error:action.payload};    
        case USER_SIGNOUT:
            return {};    
        default:
            return state;
    }
}