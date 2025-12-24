import { proxy, subscribe } from 'valtio';
import { mergeConfigRecursively, mergeStateRecursively, mergeDefaultAndLoaded, themeApplyMode } from '@/utils';
import { type AppUISettings, defaultAppUISettings } from './0-default-store';

const STORAGE_UI_KEY = 'ui-small-tests';
const STORAGE_UI_VER = 'v1';

type AppUi = {
    appUi: AppUISettings;           // App UI settings: theme, divider, etc.
};

const initialAppUi: AppUi = {
    appUi: defaultAppUISettings,
};

export const appSettings = proxy<AppUi>(loadUiInitialState());

// Apply theme changes

themeApplyMode(appSettings.appUi.themeMode);

subscribe(appSettings.appUi, () => {
    themeApplyMode(appSettings.appUi.themeMode);
});

// Local storage

function loadUiInitialState(): AppUi {
    let storageUi: any;

    let storageUiStr = localStorage.getItem(STORAGE_UI_KEY);
    if (storageUiStr) {
        try {
            storageUi = JSON.parse(storageUiStr)?.[STORAGE_UI_VER];
        } catch (error) {
            console.error('storageUi bad format');
        }
    }

    const state = mergeStateRecursively(initialAppUi, storageUi);
    return state;
}

subscribe(appSettings, () => {
    // sendNapiOptions();
    localStorage.setItem(STORAGE_UI_KEY, JSON.stringify({ [STORAGE_UI_VER]: appSettings }));
});
