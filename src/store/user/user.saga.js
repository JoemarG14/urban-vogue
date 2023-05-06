import { takeLatest, all, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { USER_TYPES } from "./user.types";
import { getCurrentUser, createUserFromAuth, signInWithGooglePopup, signInUserWithEmailAndPassword, signUpWithEmailAndPassword, signOutUser } from "../../utils/firebase/firebase.utils";
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess } from "./user.action";

export function* getSnapShotFromUserAuth(userAuth, additionalDetails) {
    console.log(additionalDetails)
    try {
        const userSnapshot = yield call(createUserFromAuth, userAuth, additionalDetails);
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapShotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle({payload: {navigate}}) {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapShotFromUserAuth, user);
        yield toast.success(`Sign In Successful`, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        yield navigate('/')
    } catch (error) {
        yield put(signInFailed(error))
    } 
}

export function* signInWithEmail({payload: { email, password, navigate, resetFormFields }}) {
    try {
        const { user } = yield call(signInUserWithEmailAndPassword, email, password);
        yield call(getSnapShotFromUserAuth, user)

        yield toast.success(`Sign In Successful`, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        yield navigate('/');
        yield resetFormFields();
    } catch (error) {
        let errorMessage = '';
        switch (error.code) {
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password for the given email.'
                break;
            case 'auth/user-not-found':
                errorMessage = 'No user associated with this email.'
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
                break;
            default:
                errorMessage = error.message;
                break;
        }

        yield put(signInFailed(error))
        yield toast.error(errorMessage, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
}

export function* signUpUser({payload: { email, password, displayName, navigate, resetFormFields }}) {
    try{
        const { user } = yield call(signUpWithEmailAndPassword, email, password)
        yield call(getSnapShotFromUserAuth, user, displayName)

        yield toast.success(`Account successfully created.`, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        yield navigate('/');
        yield resetFormFields();
    } catch (error) {
        let errorMessage = '';
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'Email is already registered.'
                break;
            default:
                errorMessage = error.message;
                break;
        }

        yield put(signInFailed(error))
        yield toast.error(errorMessage, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
}

export function* signOut({payload: {navigate, closeCartPopUp}}) {
    try {
        yield call(signOutUser)
        yield toast.success(`Account successfully signed out.`, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        yield navigate('/')
        yield closeCartPopUp()
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error))
    }
}

export function* onSignOut() {
    yield takeLatest(USER_TYPES.SIGN_OUT_START, signOut)
}

export function* onSignUp() {
    yield takeLatest(USER_TYPES.SIGN_UP_START, signUpUser)
}

export function* onEmailSignIn() {
    yield takeLatest(USER_TYPES.EMAIL_AND_PASS_START, signInWithEmail)
}

export function* onGoogleSignIn() {
    yield takeLatest(USER_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_TYPES.GET_USER_SESSION, isUserAuthenticated)
}

export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignIn),
        call(onEmailSignIn),
        call(onSignUp),
        call(onSignOut)
    ])
}