import React, { useContext } from 'react';
import useAuth from '../hooks/use-auth';

export const AuthContext = React.createContext({
    user: {},
    loading: false,
    error: null,
    login: () => {},
    signup: () => {},
    logout: () => {}
})

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = (props) => {
    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;