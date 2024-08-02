import CryptoJS from 'crypto-js';

const secretKey = 'zcE3*58kLp@1nO2eTz!xQ9hJvA7RzY5u';

export const setLocalStorageData = (key, value) => {
    if (typeof window !== 'undefined') {
        const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
        localStorage.setItem(key, encryptedValue);
    }
};

export const getLocalStorageData = (key) => {
    if (typeof window !== 'undefined') {
        const encryptedData = localStorage.getItem(key);
        if (encryptedData) {
            const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;
        }
        return null;
    }
    return null;
};

export const removeLocalStorageData = (key) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};