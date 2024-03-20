const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
// 导入菜单

const { createMenu } = require('./menu')
const createBrowerWindw = () => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    // alwaysOnTop: true, // 是否置顶
    frame: true, // 关闭菜单栏
    transparent: true, // 是否透明
    webPreferences: {
      preload: path.join(process.cwd(), './perload.js'),
      nodeIntegration: true, // 允许使用node模块
    },
  })

  // 控制缩放比例
  mainWindow.setAspectRatio(1 / 1)
  // 打开调试器
  mainWindow.webContents.toggleDevTools()
  mainWindow.loadFile(path.join(process.cwd(), './index.html'))

  // 生成菜单
  createMenu(mainWindow)
}

// 等待app启动的回调
app.whenReady().then(() => {
  createBrowerWindw()

  // 监听窗口全部关闭
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      // 如果不是苹果系统就退出
      app.quit()
    }
  })

  // 激活应用
  app.on('activate', () => {
    createBrowerWindw()
  })
})

// 事件监听

ipcMain.on('saveFile', () => {
  console.log('saveFile: ')
})
