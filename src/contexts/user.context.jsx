import { createContext, useEffect, useReducer } from "react";
import { userAuthStateListener, createUserFromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from '../utils/reducer/reducer.utils';

export const UserContext = createContext({
    userInfo: null,
    setUserInfo: () => null
});

export const USER_ACTIONS = {
    SET_USER_INFO: 'SET_USER_INFO'
}

const INITIAL_STATE = {
    userInfo: null,
}

const userReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case USER_ACTIONS.SET_USER_INFO:
            return {
                ...state,
                userInfo: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in isCartOpenReducer.`);
    }
}

export const UserProvider = ({children}) => {
    // const [userInfo, setUserInfo] = useState(null);
    const [{userInfo}, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setUserInfo = (user) => (dispatch(createAction(USER_ACTIONS.SET_USER_INFO, user)));

    const value = {userInfo, setUserInfo};

    useEffect(() => {
        const unsubscribe = userAuthStateListener((user) => {
            if(user)
                createUserFromAuth(user);
            setUserInfo(user);
        });

        // useEffect with return will process the return method 
        // when component is unmounted.
        return unsubscribe;
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}