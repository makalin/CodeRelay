"use strict";
const { app, BrowserWindow } = require('electron');
const path = require('path');
function getViteDevServerUrl() {
    // Try default port, fallback to 5174 if 5173 is not available
    const ports = [5173, 5174, 3000];
    for (const port of ports) {
        // This is a guess; ideally, you'd detect the port dynamically
        // For now, just try the first one that works
        return `http://localhost:${port}`;
    }
    return 'http://localhost:5173';
}
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        title: 'CodeRelay',
    });
    if (process.env.NODE_ENV === 'development') {
        const devUrl = getViteDevServerUrl();
        console.log('Loading dev server:', devUrl);
        mainWindow.loadURL(devUrl);
        mainWindow.webContents.openDevTools();
        mainWindow.webContents.on('did-finish-load', () => {
            mainWindow.setTitle('CodeRelay');
        });
    }
    else {
        const prodPath = path.resolve(__dirname, '../../dist/index.html');
        console.log('Loading production file:', prodPath);
        mainWindow.loadFile(prodPath);
        mainWindow.webContents.on('did-finish-load', () => {
            mainWindow.setTitle('CodeRelay');
        });
    }
}
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
//# sourceMappingURL=main.js.map