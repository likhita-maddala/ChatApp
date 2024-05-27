import { createContext, useState, useContext } from "react";
export const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
}
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null)

    return <AuthContextProvider value = {{authUser, setAuthUser}}>
        {children}
    </AuthContextProvider>;
};