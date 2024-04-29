import { StorageObjectData, StorageObjectType, StorageUserData } from './storage.types';

type StorageOptions = {
    api?: 'LocalStorage' | 'SessionStorage';
};

function getStorageApi(api: StorageOptions['api']): Storage {
    return api === 'SessionStorage' ? sessionStorage : localStorage;
}

function getItem<T extends StorageObjectType>(item: T, options?: StorageOptions): StorageObjectData<T>['data'] | null {
    const api = getStorageApi('SessionStorage');
    const data = api.getItem(item.toString());
    return data ? (JSON.parse(data) as StorageObjectData<T>['data']) : null;
}

function setItem<T extends StorageObjectType>(
    itemName: T,
    data: StorageObjectData<T>['data'],
    options?: StorageOptions,
): void {
    if (data === null || data === undefined) {
        return;
    }

    const api = getStorageApi('SessionStorage');
    api.setItem(itemName, JSON.stringify(data));
}

function removeItem<T extends StorageObjectType>(item: T, options?: StorageOptions): void {
    const api = getStorageApi('SessionStorage');
    api.removeItem(item);
}

function clear(options?: StorageOptions): void {
    const api = getStorageApi('SessionStorage');
    api.clear();
}

export const storage = {
    getItem,
    setItem,
    removeItem,
    clear,
};
function getUser(user: string): StorageUserData['data'] | null {
    const api = getStorageApi('LocalStorage');
    const data = api.getItem(user);
    return data ? (JSON.parse(data) as StorageUserData['data']) : null;
}

function setUser(
    user: string, 
    data: StorageUserData['data'],
): void {
    if (data === null || data === undefined) {
        return;
    }

    const api = getStorageApi('LocalStorage');
    api.setItem(user, JSON.stringify(data));
}

function removeUser(user: string): void {
    const api = getStorageApi('LocalStorage');
    api.removeItem(user);
}
function clearUserStorage(): void {
    const api = getStorageApi('LocalStorage');
    api.clear();
}
export const userStorage = {
    getUser, 
    setUser, 
    removeUser, 
    clearUserStorage
}
