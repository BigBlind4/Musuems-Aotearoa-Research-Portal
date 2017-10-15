import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    getStoredData(argument: string) {
        return sessionStorage.getItem(argument);
    }

    setStoredData (key: string, value: any)  {
        sessionStorage.setItem(key, value);
    }

    cleanStoredData() {
        sessionStorage.clear();
    }

    removeStoredData(key: string) {
        sessionStorage.removeItem(key);
    }
}