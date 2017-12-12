/* eslint max-len: [0] */

import { search, shellCommand } from 'cerebro-tools';
import powerIcn from './assets/power.png';
import refreshIcn from './assets/refresh.png';
import signoutIcn from './assets/sign-out.png';
import bedIcn from './assets/bed.png';
import lockIcn from './assets/lock.png';
import screensaverIcn from './assets/picture-o.png';

const COMMANDS = {
  Restart: {
    command: "osascript -e 'tell app \"loginwindow\" to «event aevtrrst»'",
    icon: refreshIcn
  },
  Logout: {
    command: "osascript -e 'tell app \"System Events\" to log out'",
    icon: signoutIcn
  },
  Sleep: {
    command: 'pmset sleepnow',
    icon: bedIcn
  },
  Lock: {
    command: '/System/Library/CoreServices/Menu\\ Extras/User.menu/Contents/Resources/CGSession -suspend',
    icon: lockIcn
  },
  'Shut Down': {
    command: "osascript -e 'tell app \"loginwindow\" to «event aevtrsdn»'",
    icon: powerIcn
  },
  'Screen Saver': {
    command: 'open -a ScreenSaverEngine',
    icon: screensaverIcn
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
export const fn = ({ term, display }) => {
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