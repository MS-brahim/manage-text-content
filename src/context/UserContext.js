'use client';

import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const userStorage = localStorage.getItem('user');
        return userStorage ? JSON.parse(userStorage) : {};
    });
    const [userRole, setUserRole] = useState(user?.role || null);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const login = (user) => {
        setUser(user);
        setUserRole(user.role);
    };

    const logout = () => {
        setUser({});
        setUserRole(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ userRole, user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
