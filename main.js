const { app, BrowserWindow, session } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 640,
    height: 455,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {

  session.defaultSession.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      if (permission === 'geolocation') {
        callback(true); // allow it
      } else {
        callback(false);
      }
    }
  );

  createWindow();
});

