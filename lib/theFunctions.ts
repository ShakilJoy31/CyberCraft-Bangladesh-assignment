// localStorageUtils.ts

export const getFromLocalStorage = <T>(key: string): T | null => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
        return JSON.parse(storedData) as T;
    }
    return null;
};


