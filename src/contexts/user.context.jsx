import { createContext, useState, useEffect } from "react";
import { userAuthStateListener, createUserFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    userInfo: null,
    setUserInfo: () => null
});

export const UserProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);
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