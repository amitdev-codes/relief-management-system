import React, { createContext, useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export const AuthContext = createContext();

export const AuthProvider = ({ children, auth }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!auth?.user);
    const [user, setUser] = useState(auth?.user || null);

    useEffect(() => {
        // setIsAuthenticated(auth?.user ? true : false);
        setIsAuthenticated(!!auth?.user);
        setUser(auth?.user);
    }, [auth?.user]);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        router.post('logout', {}, {
            onSuccess: () => {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
