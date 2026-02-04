const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 660,
    height: 420,
   resizable: false
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
