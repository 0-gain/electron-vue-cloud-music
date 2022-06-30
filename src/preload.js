// const { ipcRenderer } = require('electron');
// window.ipcRenderer = require('electron').ipcRenderer;

import { ipcRenderer } from "electron";
window.ipcRenderer = ipcRenderer;
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
alert("It Worked!"); // Remove this line once you confirm it worked
