export const setLocalStorageData = (key, value) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getLocalStorageData = (key) => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    return null;
};

export const removeLocalStorageData = (key) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};