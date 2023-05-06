import { toast } from "react-toastify";
import { USER_TYPES } from "./user.types";

const INITIAL_STATE = {
    userInfo: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch (type) {
        case USER_TYPES.SIGN_IN_SUCCESS:
        case USER_TYPES.SIGN_UP_SUCCESS:
        case USER_TYPES.SIGN_OUT_SUCCESS:
            return { ...state, userInfo: payload }
        case USER_TYPES.SIGN_IN_FAILED:
        case USER_TYPES.SIGN_UP_FAILED:
        case USER_TYPES.SIGN_OUT_FAILED:
            return { ...state, error: payload }
        default:
            return state;
    }
}