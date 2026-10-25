import { menu, setLanguage, setUIColors, colors } from 'cli-menu-kit';
import 'colors';
import { decodeString } from './src/strings.js';
import { startWebServer } from './src/devServer.js'

setLanguage('en');

setUIColors({
  primary: colors.cyan,
  textSecondary: colors.dim,
  error: colors.red,
  border: colors.magenta,
  separator: colors.dim
})

function settingsMenu() {
    console.log("hi")
}

function exit() {
    console.log("Exitting...".bold.red)
    process.exit(0)
}

let menuOptionFuncs = [
    undefined,
    decodeString,
    startWebServer,
    undefined,
    settingsMenu,
    exit
]

while (true) {
    let menuOption = await menu.radio({
        options: [
            { type: 'separator', label: 'Utilities' },
            ' Decode String',
            ' Start Development Server',
            { type: 'separator', label: 'Others' },
            ' Settings',
            '󰩈 Exit'
        ],
        hints: ['↑↓ Navigate'],
        separatorWidth: 40,
        allowNumberKeys: true,
        allowLetterKeys: false
    })
    if (typeof menuOption.index == "number") {
        await menuOptionFuncs[menuOption.index].call()
    }
}