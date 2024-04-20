const { app, BrowserWindow } = require('electron');
const { join } = require('path');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    alwaysOnTop: true, // 置顶
    // x 默认窗口位置
    // y
  });
  mainWindow.loadFile(join(__dirname, '/views/render.html'));
};

// 等待窗口启动
app.whenReady().then(() => {
  createWindow();
  app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
      app.quit();
    }
  });
});
