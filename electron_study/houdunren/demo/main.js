const { app, BrowserWindow } = require('electron')
const path = require('path')
const createBrowerWindw = () => {

  for (let i = 0; i < 10; i++){
    console.log('i: ', i);
    
  }

  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    // alwaysOnTop: true, // 是否置顶
    frame: false, // 关闭菜单栏
    transparent: true, // 是否透明
  })

  // 控制缩放比例
  mainWindow.setAspectRatio(1 / 1)
  // 打开调试器
  // mainWindow.webContents.toggleDevTools()
  mainWindow.loadFile(path.join(process.cwd(), './index.html'))
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
