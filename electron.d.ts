interface Window {
    electronAPI: {
        getAppDataPath: () => Promise<string>;
        getUserDataPath: () => Promise<string>;
    };
}