import * as electron from 'electron';
import serve from "electron-serve";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {dialog} from "electron";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appServe = electron.app.isPackaged ? serve({
    directory: path.join(__dirname, "../out")
}) : null;

const getCustomAppDataPath = () => {
    const platform = process.platform;
    const companyName = 'ReverseTeam';
    const appName = 'inCode';
    const dataFolder = 'data';

    if (platform === 'win32') {
        return path.join(electron.app.getPath('appData'), '..', 'Local', companyName, appName, dataFolder);
    } else if (platform === 'darwin') {
        return path.join(electron.app.getPath('appData'), companyName, appName, dataFolder);
    } else {
        return path.join(electron.app.getPath('home'), '.config', companyName, appName, dataFolder);
    }
};

electron.app.setPath('userData', getCustomAppDataPath());

const createWindow = () => {
    const win = new electron.BrowserWindow({
        width: 1600,
        height: 900,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // contextIsolation: true,
            // sandbox: true,
            contextIsolation: true,
            nodeIntegration: false, // Должно быть false для безопасности!
            enableRemoteModule: false
        }
    });

    // Обработчики IPC
    electron.ipcMain.handle('get-custom-appdata-path', () => {
        return electron.app.getPath('userData');
    });
    if (electron.app.isPackaged) {
        appServe(win).then(() => {
            electron.win.loadURL("app://-");
        });
    } else {
        win.loadURL("http://localhost:3000");
        // win.webContents.openDevTools();
        win.webContents.on("did-fail-load", (e, code, desc) => {
            win.webContents.reloadIgnoringCache();
        });
    }
}

electron.app.on("ready", () => {
    createWindow();
});

electron.app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        electron.app.quit();
    }
});

