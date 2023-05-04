import { USER_TYPES } from "./user.types";

const INITIAL_STATE = {
    userInfo: null,
}

export const userReducer = (state = INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch (type) {
        case USER_TYPES.SET_USER_INFO:
            return {
                ...state,
                userInfo: payload
            }
        default:
            return state;
    }
}