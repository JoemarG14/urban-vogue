import { USER_TYPES } from "./user.types";
import { createAction } from '../../utils/reducer/reducer.utils';

export const setUserInfo = (user) => 
    createAction(USER_TYPES.SET_USER_INFO, user);

export const checkUserSession = () => 
    createAction(USER_TYPES.GET_USER_SESSION);

export const googleSignInStart = (navigate) => 
    createAction(USER_TYPES.GOOGLE_SIGN_IN_START, {navigate});

export const emailSignInStart = (email, password, navigate, resetFormFields) => 
    createAction(USER_TYPES.EMAIL_AND_PASS_START, {email, password, navigate, resetFormFields});

export const signInSuccess = (user) => 
    createAction(USER_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) => 
    createAction(USER_TYPES.SIGN_IN_FAILED, error);

export const signUpStart = (email, password, displayName, navigate, resetFormFields) => 
    createAction(USER_TYPES.SIGN_UP_START, {email, password, displayName, navigate, resetFormFields})

export const signOutStart = (navigate, closeCartPopUp) => 
    createAction(USER_TYPES.SIGN_OUT_START, {navigate, closeCartPopUp});

export const signOutSuccess = () => 
    createAction(USER_TYPES.SIGN_OUT_SUCCESS, null);

export const signOutFailed = (error) => 
    createAction(USER_TYPES.SIGN_OUT_SUCCESS, error);

