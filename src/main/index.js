'use strict'

import {
  app,
  BrowserWindow,
  screen,
  ipcMain,
  globalShortcut,
  systemPreferences,
  Menu,
} from 'electron'
import menubar from 'menubar'
import moment from 'moment'
import path from 'path'
import 'moment-duration-format'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
const isDevelopment = process.env.NODE_ENV === 'development'
if (!isDevelopment) {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}
const MAX_STRING_COUNT = 12
const windowURL = isDevelopment
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
const fsnotifierURL = isDevelopment
  ? `http://localhost:9080/notifier.html`
  : `file://${__dirname}/notifier.html`
// function createWindow() {
//   /**
//    * Initial window options
//    */
//   mainWindow = new BrowserWindow({
//     height: 640,
//     useContentSize: true,
//     width: 640,
//     frame: false,
//     show: true,
//     // darkTheme: true,
//     resizable: false
//   })
//
//   mainWindow.loadURL(winURL)
//
//   mainWindow.on('closed', () => {
//     mainWindow = null
//   })
// }
let iconfile = systemPreferences.isDarkMode()
  ? '/images/icon_dark_tray.png'
  : '/images/icon_tray.png'
let mb = menubar({
  index: windowURL,
  resizable: false,
  frame: false,
  icon: path.join(__static, iconfile),
  height: 640,
  width: 640,
  preloadWindow: true,
  showDockIcon: isDevelopment,
})
mb.on('ready', () => {
  mb.tray.setToolTip(`${app.getName()} ${app.getVersion()}`)
  mb.tray.setHighlightMode(false)
  mb.showWindow()
  const template = [
    {
      label: 'Application',
      submenu: [
        // { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
        // { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() {
            app.quit()
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          selector: 'selectAll:',
        },
      ],
    },
  ]
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
})
mb.on('after-create-window', () => {})
let fullscreenNotifier
function createFullscreenNotifier() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  fullscreenNotifier = new BrowserWindow({
    parent: mb,
    left: 0,
    top: 0,
    width,
    height,
    transparent: true,
    backgroundColor: '#00000000',
    hasShadow: false,
    frame: false,
    // titleBarStyle: 'hidden',
    resizable: false,
    alwaysOnTop: true,
    show: true,
  })
  fullscreenNotifier.setIgnoreMouseEvents(true)
  fullscreenNotifier.loadURL(fsnotifierURL)
  fullscreenNotifier.on('closed', function() {
    fullscreenNotifier = null
  })
}
let isShown = false
mb
  .on('after-show', () => {
    isShown = true
  })
  .on('after-hide', () => {
    isShown = false
  })
  .on('focus-lost', () => {
    isShown = false
  })
app.on('ready', () => {
  createFullscreenNotifier()
  globalShortcut.register('cmd+ctrl+Return', function() {
    mb.window.webContents.send('toggle-timer')
  })
  globalShortcut.register('cmd+ctrl+P', function() {
    isShown ? mb.hideWindow() : mb.showWindow()
  })
})
app.on('will-quit', function() {
  globalShortcut.unregisterAll()
})

let mainTimer
ipcMain.on('start-timer', (event, mission) => {
  mainTimer = new Timer(mission)
  mainTimer.start()
})
ipcMain.on('stop-timer', (event, mission) => {
  if (mainTimer) {
    mainTimer.stop()
  }
})
ipcMain.on('force-complete-timer', (event, mission) => {
  if (mainTimer) {
    mainTimer.forceComplete()
  }
})
ipcMain.on('extend-timer', (event, amount) => {
  if (mainTimer) {
    mainTimer.extend(amount)
  }
})
ipcMain.on('update-menubar-title', (event, message) => {
  mb.tray.setTitle(message)
})
// event.sender.send('reply')
ipcMain.on('fs-notifier', (event, type) => {
  fullscreenNotifier.webContents.send('fs-notification', type)
})
ipcMain.on('apply-settings', (event, type) => {
  fullscreenNotifier.webContents.send('apply-settings', type)
})

let time, str
class Timer {
  constructor(mission) {
    this.sec = mission.remainingSec
    this.timerId = null
    if (mission.name.length > MAX_STRING_COUNT) {
      this.name = mission.name.substr(0, MAX_STRING_COUNT) + '…'
    } else {
      this.name = mission.name
    }
  }
  countdown() {
    this.sec--
    this.display()
    mb.window.webContents.send('countdown-time')
    if (this.sec <= 0) this.complete()
  }
  start() {
    let self = this
    this.timerId = setInterval(function() {
      self.countdown()
    }, 1000)
  }
  forceComplete() {
    this.sec = 0
    this.display()
  }
  extend(amount) {
    this.sec += amount
    this.display()
  }
  stop() {
    clearInterval(this.timerId)
  }
  complete() {
    clearInterval(this.timerId)
  }
  display() {
    time = moment.duration(this.sec, 'seconds').format('mm:ss', { trim: false })
    str = this.name
    if (this.sec < 0) {
      time = '00:00'
    }
    mb.tray.setTitle(`${time} | ${str}`)
  }
}
ipcMain.on('quit-app', (event, type) => {
  app.quit()
})
//
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })
//
// app.on('activate', () => {
//   if (mainWindow === null) {
//     createWindow()
//   }
// })

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
