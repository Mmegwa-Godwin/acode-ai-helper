let acodeAPI = null;

function setAcodeAPI(api) {
  acodeAPI = api;
}

function getAcodeAPI() {
  return acodeAPI;
}

function showMessage(message) {
  if (!acodeAPI) {
    console.log("[AI Helper]", message);
    return;
  }

  if (acodeAPI.toast) {
    acodeAPI.toast(message);
    return;
  }

  if (acodeAPI.alert) {
    acodeAPI.alert(message);
    return;
  }

  if (window && window.alert) {
    window.alert(message);
    return;
  }

  console.log("[AI Helper]", message);
}

function getSelectedText() {
  if (!acodeAPI) return "";

  if (acodeAPI.editor && acodeAPI.editor.getSelectedText) {
    return acodeAPI.editor.getSelectedText();
  }

  if (acodeAPI.getSelectedText) {
    return acodeAPI.getSelectedText();
  }

  if (acodeAPI.editor && acodeAPI.editor.selection) {
    return acodeAPI.editor.selection;
  }

  if (typeof editor !== "undefined" && editor.getSelectedText) {
    return editor.getSelectedText();
  }

  return "";
}

function insertTextIntoEditor(text) {
  if (!acodeAPI) {
    console.log("[AI Helper] Insert:", text);
    return;
  }

  if (acodeAPI.editor && acodeAPI.editor.insert) {
    acodeAPI.editor.insert(text);
    return;
  }

  if (acodeAPI.insert) {
    acodeAPI.insert(text);
    return;
  }

  if (acodeAPI.editor && acodeAPI.editor.replaceSelection) {
    acodeAPI.editor.replaceSelection(text);
    return;
  }

  if (typeof editor !== "undefined" && editor.insert) {
    editor.insert(text);
    return;
  }

  console.log("[AI Helper] Insert (fallback):", text);
}

function promptForValue(title, defaultValue = "") {
  if (!acodeAPI) return defaultValue;

  if (acodeAPI.prompt) {
    return acodeAPI.prompt(title, defaultValue);
  }

  if (acodeAPI.showInputDialog) {
    return acodeAPI.showInputDialog(title, defaultValue);
  }

  if (window && window.prompt) {
    return window.prompt(title, defaultValue);
  }

  return defaultValue;
}

function showOutput(text) {
  if (!acodeAPI) {
    console.log("[AI Helper] Output:\n", text);
    return;
  }

  if (acodeAPI.showModal) {
    acodeAPI.showModal({
      title: "AI Output",
      body: text
    });
    return;
  }

  if (acodeAPI.dialog) {
    acodeAPI.dialog({
      title: "AI Output",
      message: text
    });
    return;
  }

  if (acodeAPI.showOutput) {
    acodeAPI.showOutput(text);
    return;
  }

  console.log("[AI Helper] Output:\n", text);
}

function registerCommand(name, callback) {
  if (!acodeAPI) {
    console.log("[AI Helper] Command registered (offline):", name);
    return;
  }

  if (acodeAPI.registerCommand) {
    acodeAPI.registerCommand(name, callback);
    return;
  }

  if (acodeAPI.addCommand) {
    acodeAPI.addCommand(name, callback);
    return;
  }

  if (window && window.acodePlugin && window.acodePlugin.registerCommand) {
    window.acodePlugin.registerCommand(name, callback);
    return;
  }

  console.log("[AI Helper] Command registered (fallback):", name);
}

module.exports = {
  setAcodeAPI,
  getAcodeAPI,
  showMessage,
  getSelectedText,
  insertTextIntoEditor,
  promptForValue,
  showOutput,
  registerCommand
};
