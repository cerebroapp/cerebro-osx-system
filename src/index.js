/* eslint max-len: [0] */

const { search, shellCommand } = require('cerebro-tools')

// Load icons
const icloudDriveIcon = require('./icloud_drive.png')

const COMMANDS = {
  Restart: {
    command: "osascript -e 'tell app \"loginwindow\" to «event aevtrrst»'",
  },
  Logout: {
    command: "osascript -e 'tell app \"System Events\" to log out'",
  },
  Sleep: {
    command: 'pmset sleepnow',
  },
  Lock: {
    command: '/System/Library/CoreServices/Menu\\ Extras/User.menu/Contents/Resources/CGSession -suspend',
  },
  'Shut Down': {
    command: "osascript -e 'tell app \"loginwindow\" to «event aevtrsdn»'",
  },
  'Screen Saver': {
    command: 'open -a ScreenSaverEngine',
  },
  'iCloud Drive': {
    command: `open /Users/${process.env.USER}/Library/Mobile\\ Documents/com\~apple\~CloudDocs`,
    icon: icloudDriveIcon,
    subtitle: 'Open iCloud Drive in Finder'
  },
  Trash: {
    command: `open /Users/${process.env.USER}/.Trash`,
    icon: '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/TrashIcon.icns',
    subtitle: 'Show trash'
  },
  'Empty Trash': {
    command: `osascript -e 'tell app "Finder" to if (count of items in trash) > 0 then empty trash'`,
    icon: '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/TrashIcon.icns',
  }
}

/**
 * Plugin for OSx system commands, like lock, screen saver, etc.
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const fn = ({ term, display }) => {
  const commands = search(Object.keys(COMMANDS), term)
  if (commands.length > 0) {
    const result = commands.map((cmd) => ({
      title: cmd,
      subtitle: COMMANDS[cmd].subtitle,
      term: cmd,
      icon: COMMANDS[cmd].icon,
      onSelect: () => shellCommand(COMMANDS[cmd].command)
    }))
    display(result)
  }
}

module.exports = { fn }
