import { isPlatformBrowser } from '@angular/common';
import { computed, Inject, Injectable, PLATFORM_ID, signal, Signal } from '@angular/core';

export type StorageType = 'local' | 'session';

// Storage change event interface
export interface StorageChangeEvent {
    key: string;
    newValue: any;
    oldValue: any;
    storageType: StorageType;
    action: 'set' | 'remove' | 'clear';
}

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private _storageType = signal<StorageType>('session');
    currentStorageType = this._storageType.asReadonly();

    private _latestChange = signal<StorageChangeEvent | null>(null);
    latestChange = this._latestChange.asReadonly();

    // Map to store key-specific changes
    private keyChanges = new Map<string, ReturnType<typeof signal<StorageChangeEvent | null>>>();

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {


        if (isPlatformBrowser(this.platformId)) { 
            window.addEventListener('storage', (event) => {
                if (event.storageArea === this._getStorage()) {
                    const storageEvent: StorageChangeEvent = {
                        key: event.key || '',
                        newValue: event.newValue ? JSON.parse(event.newValue) : null,
                        oldValue: event.oldValue ? JSON.parse(event.oldValue) : null,
                        storageType: this._storageType(),
                        action: event.key === null ? 'clear' : (event.newValue === null ? 'remove' : 'set')
                    };
                    this._notifyChange(storageEvent);
                }
            });
        }
    }

    /**
     * Get the current storage object based on selected type
     */
    private _getStorage(): Storage {
        if (!isPlatformBrowser(this.platformId)) {
            return {} as Storage; // Return an empty object if not in browser
        }
        return this._storageType() === 'local'
            ? localStorage
            : sessionStorage;
    }

    /**
     * Internal method to notify about storage changes
     */
    private _notifyChange(change: StorageChangeEvent): void {
        this._latestChange.set(change);

        // Update key-specific signal if exists
        if (this.keyChanges.has(change.key)) {
            this.keyChanges.get(change.key)?.set(change);
        }

        // If it's a clear action, update all key signals
        if (change.action === 'clear') {
            this.keyChanges.forEach(keySignal => {
                keySignal.set(change);
            });
        }
    }


    /**
     * Set the storage type to use (local or session)
     */
    setStorageType(type: StorageType): void {
        this._storageType.set(type);
    }

    /**
     * Store a value with the given key
     */
    set<T>(key: string, value: T): void {
        if (isPlatformBrowser(this.platformId)) {
        try {
            const storage = this._getStorage();
            const oldValue = this.get(key);
            storage.setItem(key, JSON.stringify(value));

            // Create and emit change event
            const change: StorageChangeEvent = {
                key,
                newValue: value,
                oldValue,
                storageType: this._storageType(),
                action: 'set'
            };

            this._notifyChange(change);
        } catch (error) {
            console.error('Error storing data', error);
        }
    }
    }

    /**
     * Retrieve a value by key
     */
    get<T>(key: string): T | null {
        if(!isPlatformBrowser(this.platformId)) { 
            return null; // Return null if not in browser
        }
        try {
            const storage = this._getStorage();
            const item = storage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error retrieving data', error);
            return null;
        }
    }

    /**
     * Remove an item by key
     */
    remove(key: string): void {
        const storage = this._getStorage();
        const oldValue = this.get(key);
        storage.removeItem(key);

        // Create and emit change event
        const change: StorageChangeEvent = {
            key,
            newValue: null,
            oldValue,
            storageType: this._storageType(),
            action: 'remove'
        };

        this._notifyChange(change);
    }

    /**
     * Clear all items from the current storage
     */
    clear(): void {
        const storage = this._getStorage();
        storage.clear();

        // Create and emit change event
        const change: StorageChangeEvent = {
            key: '',
            newValue: null,
            oldValue: null,
            storageType: this._storageType(),
            action: 'clear'
        };

        this._notifyChange(change);
    }

    /**
     * Check if a key exists in storage
     */
    has(key: string): boolean {
        const storage = this._getStorage();
        return storage.getItem(key) !== null;
    }

    /**
     * Get a signal for watching changes to a specific key
     */
    watch(key: string): Signal<StorageChangeEvent | null> {
        // Create a new signal for this key if it doesn't exist
        if (!this.keyChanges.has(key)) {
            this.keyChanges.set(key, signal<StorageChangeEvent | null>(null));
        }
        return this.keyChanges.get(key)!.asReadonly();
    }
}