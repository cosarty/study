const { Menu } = require('electron')

const createMenu = (win) => {
  const menu = [
    {
      label: '菜单',
      submenu: [
        {
          label: '增加',
          click: () => {
            console.log(win.webContents)
          },
        },
      ],
    },
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))
}

module.exports = {
  createMenu,
}
