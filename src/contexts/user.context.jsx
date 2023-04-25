import { createContext, useState } from "react";

export const UserContext = createContext({
    userInfo: null,
    setUserInfo: () => null
});

export const UserProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);
    const value = {userInfo, setUserInfo};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}