import strings from "./decoded.json" with {type: 'json'}
import 'colors';
import { menu, input } from 'cli-menu-kit';
import "node:process"

export async function decodeString() {
    console.log("Type 'exit' to exit.".dim)
    let canContinue = true;
    while (canContinue) {
        let value = await input.text({
            "placeholder": "Hexadecimal / Decimal / exit",
            "prompt": "Enter the code for your string"
        });
        if (value.toLowerCase()=="exit") {
            canContinue = false;
            continue;
        }
        let dec = parseInt(value, 10);
        let hex = parseInt(value, 16);
        let xHex = parseInt("0x"+value, 16);
        let num = NaN;
        if (/^\d+$/.test(value)) {
            num = dec
        } else if (!isNaN(hex)) {
            num=hex
        } else if (!isNaN(xHex)) {
            num=xHex
        } else {
            console.log(`Enter a number in hexadecimal (0x...) or decimal format. (you typed ${value})`.bold.red);
            continue;
        }
        if (num<187) {
            console.log(`This item doesnt exist in the array. (index ${num})`.bold.red)
            continue
        }
        let result = strings.strings[num-187];
        if (result==undefined) {
            console.log(`This item doesnt exist in the array. (index ${num})`.bold.red)
            continue
        }
        console.log(value.cyan.concat(": ", result.bold.yellow));
    }
    let mainMenu = await menu.booleanH("Return to Main Menu?", true);
    if (mainMenu == false) {
        console.log("Exitting...".bold.red);
        process.exit(0);
    } else {
        return;
    }
}