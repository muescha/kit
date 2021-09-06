"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Description: Run the selected script
const utils_js_1 = require("../utils.js");
setFlags({
    [""]: {
        name: "Run script",
        shortcut: "enter",
    },
    open: {
        name: "Open script in editor",
        shortcut: "cmd+o",
    },
    ["share-copy"]: {
        name: "Copy script content to clipboard",
        shortcut: "cmd+c",
    },
    ["new-quick"]: {
        name: "Quick new script",
        shortcut: "cmd+n",
    },
    duplicate: {
        name: "Duplicate script",
        shortcut: "cmd+d",
    },
    rename: {
        name: "Rename script",
        shortcut: "cmd+r",
    },
    remove: {
        name: "Remove script",
        shortcut: "cmd+backspace",
    },
    ["open-script-log"]: {
        name: `Open script log`,
        shortcut: "cmd+l",
    },
    ["open-script-database"]: {
        name: `Open script database`,
        shortcut: "cmd+b",
    },
    ["share-script"]: {
        name: "Share as Gist",
        shortcut: "cmd+g",
    },
    ["share-script-as-link"]: {
        name: "Share as URL",
        shortcut: "cmd+u",
    },
    ["share-script-as-discussion"]: {
        name: "Prep for discussion",
        shortcut: "cmd+p",
    },
    ["change-shortcut"]: {
        name: "Change shortcut",
    },
    move: {
        name: "Move script to kenv",
        shortcut: "cmd+m",
    },
});
let script = await (0, utils_js_1.selectScript)(`Run script`, true, scripts => scripts.filter(script => !script?.exclude));
let shouldEdit = script.watch ||
    script.schedule ||
    script.system ||
    flag?.open;
if (script.background) {
    (0, utils_js_1.toggleBackground)(script);
}
else if (shouldEdit) {
    await edit(script.filePath, kenvPath());
}
else {
    let selectedFlag = Object.keys(flag).find(Boolean);
    if (selectedFlag) {
        await run(`${kitPath("cli", selectedFlag)}.js ${script.filePath}`);
    }
    else {
        await run(script.filePath);
    }
}