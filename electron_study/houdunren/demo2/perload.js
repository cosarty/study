const { ipcRenderer, contextBridge } = require('electron')
const fs = require('fs')

console.log(fs.readFileSync('./package.json', 'utf-8'))

// window.addEventListener('DOMContentLoaded', () => {
//   console.log('dom加载完成')
// })

contextBridge.exposeInMainWorld('api', {
  send: () => {
    ipcRenderer.send('saveFile')
  },
})
