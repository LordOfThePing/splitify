import { AppTheme } from '@lib/services/theme';

type StorageObjectMap = {
    appSession: {
        user: string;
        token: string;
    };
    appTheme: AppTheme;
};

export type StorageObjectType = 'appSession' | 'appTheme';

export type StorageObjectData<T extends StorageObjectType> = {
    type: T;
    data: StorageObjectMap[T];
};

type StorageUsersMap = {
    [user: string]: {
        pass: string, 
        token: string, 
        first_name: string, 
        last_name: string 
    }
};
export type StorageUserData = {
    data: StorageUsersMap[string];
};
