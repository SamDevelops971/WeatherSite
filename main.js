const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 640,
    height: 430,
   resizable: false,
  frame: false,
    webPreferences: {
     nodeIntegration: true
  }
  });

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
