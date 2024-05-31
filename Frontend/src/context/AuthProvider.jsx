import React, { createContext, useContext, useState } from 'react';


export const AuthContext = createContext();
export function AuthProvider({children}) {
    const initialAuthUser = localStorage.getItem("token");
    const [authUser, setAuthUser] = useState(initialAuthUser)
    
    return(
        <AuthContext.Provider value={[ authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);