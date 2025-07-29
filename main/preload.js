const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    },
    readFile: (path) => ipcRenderer.invoke('read-file', path),
    writeFile: (path, content) => ipcRenderer.invoke('write-file', path, content),
    getCustomAppDataPath: () => ipcRenderer.invoke('get-custom-appdata-path'),
    openFolderDialog: () => ipcRenderer.invoke('open-folder-dialog')
});