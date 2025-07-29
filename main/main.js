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
    electron.ipcMain.handle('read-file', async (_, filePath) => {
        try {
            // Try to read file directly
            const data = await fs.readFile(filePath, 'utf-8');
            console.log("Projects.json exists at:", filePath);
            return data;
        } catch (readError) {
            if (readError.code === 'ENOENT') { // File doesn't exist
                try {
                    // Create file with valid initial JSON (empty array)
                    await fs.writeFile(filePath, "[]", 'utf-8');
                    console.log('File created successfully:', filePath);

                    // Return initial data
                    return "[]";
                } catch (writeError) {
                    console.error('Error creating file:', writeError);
                    throw new Error('File creation failed');
                }
            } else {
                // Other read errors (permissions, etc)
                console.error('Error reading file:', readError);
                throw new Error('File read failed');
            }
        }
    });
    electron.ipcMain.handle('write-file', (_, filePath, content) => {
        return fs.promises.writeFile(filePath, content);
    });
    electron.ipcMain.handle('open-folder-dialog', async () => {
        const result = dialog.showOpenDialog({
            properties: ['openDirectory']
        })
        return (await result).filePaths[0] || null
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

