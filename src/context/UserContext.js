'use client';

import { createContext, useState, useEffect } from 'react';
import { setLocalStorageData, getLocalStorageData } from '../utils/dbStorage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Retrieve user data from localStorage or use an empty object
    const [user, setUser] = useState(getLocalStorageData('user') || {});
    const [userRole, setUserRole] = useState(user?.role || null);

    useEffect(() => {
        // Update localStorage whenever user changes
        setLocalStorageData('user', user);
    }, [user]);

    const login = (user) => {
        setUser(user);
        setUserRole(user.role);
    };

    return (
        <UserContext.Provider value={{ userRole, user, login }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
