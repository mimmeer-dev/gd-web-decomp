import browserSync from "browser-sync"
import { menu, input } from 'cli-menu-kit';
import open from 'open';
import 'colors';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function startWebServer() {
    let srvPort = await input.number({
        prompt: "What port do you want to run on?",
        allowNegative: false,
        allowDecimals: false
    })
    let server = browserSync.create();
    await server.init({
        watch: true,
        server: "../",
        port: srvPort,
        ui: false,
        open: false,
        ghostMode: false,
        logLevel: "none"
    });
    await sleep(500); // waits for the server to start up
    console.log(`Server running on port ${server.getOption("port").toString()}`.rainbow.bold);
    let canContinue = true;
    while (canContinue) {
        let au_state = server.paused ? "󰐊 Resume" : "󰏤 Pause"
        let choice = await menu.radio({
            options: [
                '󰑓 Reload Browsers',
                `${au_state} Auto-Updates`,
                '󰏌 Open in Browser',
                '󰩈 Exit'
            ],
            hints: ['↑↓ Navigate'],
            separatorWidth: 40,
            allowNumberKeys: true,
            allowLetterKeys: false
        });
        switch (choice.index) {
            case 0:
                server.reload();
                break;
            case 1:
                if (server.paused) {
                    server.resume();
                    server.reload();
                } else {
                    server.pause();
                }
                break;
            case 2:
                open(server.getOption("urls").get("local"))
                break;
            case 3:
                let mainMenu = await menu.booleanH("Shut down web server?", true);
                if (mainMenu == true) {
                    console.log("Shutting down server...".bold.red);
                    canContinue = false;
                } else {
                    break;
                }
        }
    }
    server.cleanup();
    server.exit();
}