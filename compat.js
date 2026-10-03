// Cross-version compatibility layer for Acode
// Abstracts away version-specific APIs

let acodeAPI = null;

function setAcodeAPI(api) {
  acodeAPI = api;
}

function getAcodeAPI() {
  return acodeAPI;
}

// Toast/notification - compatible across versions
function showMessage(message) {
  if (!acodeAPI) {
    console.log("[AI Helper]", message);
    return;
  }

  // Try common Acode notification APIs
  if (acodeAPI.toast) {
    acodeAPI.toast(message);
  } else if (acodeAPI.alert) {
    acodeAPI.alert(message);
  } else if (window && window.alert) {
    window.alert(message);
  } else {
    console.log("[AI Helper]", message);
  }
}

// Get selected text from editor
function getSelectedText() {
  if (!acodeAPI) return "";

  // Try common selection APIs
  if (acodeAPI.editor && acodeAPI.editor.getSelectedText) {
    return acodeAPI.editor.getSelectedText();
  }

  if (acodeAPI.getSelection) {
    return acodeAPI.getSelection();
  }

  if (acodeAPI.editor && acodeAPI.editor.selection) {
    return acodeAPI.editor.selection;
  }

  // Fallback
  return "";
}

// Insert text into editor
function insertTextIntoEditor(text) {
  if (!acodeAPI) {
    console.log("[AI Helper] Insert:", text);
    return;
  }

  // Try common insertion APIs
  if (acodeAPI.editor && acodeAPI.editor.insert) {
    acodeAPI.editor.insert(text);
  } else if (acodeAPI.insert) {
    acodeAPI.insert(text);
  } else if (acodeAPI.editor && acodeAPI.editor.replaceSelection) {
    acodeAPI.editor.replaceSelection(text);
  } else {
    console.log("[AI Helper] Insert (fallback):", text);
  }
}

// Prompt for user input
function promptForValue(title, defaultValue = "") {
  if (!acodeAPI) return defaultValue;

  // Try common prompt APIs
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

// Show output in modal or panel
function showOutput(text) {
  if (!acodeAPI) {
    console.log("[AI Helper] Output:\\n", text);
    return;
  }

  // Try common output APIs
  if (acodeAPI.showModal) {
    acodeAPI.showModal({
      title: "AI Output",
      body: text
    });
  } else if (acodeAPI.dialog) {
    acodeAPI.dialog({
      title: "AI Output",
      message: text
    });
  } else if (acodeAPI.showOutput) {
    acodeAPI.showOutput(text);
  } else {
    console.log("[AI Helper] Output:\\n", text);
  }
}

// Register a command
function registerCommand(name, callback) {
  if (!acodeAPI) {
    console.log("[AI Helper] Command registered (offline):", name);
    return;
  }

  // Try common registration APIs
  if (acodeAPI.registerCommand) {
    acodeAPI.registerCommand(name, callback);
  } else if (acodeAPI.addCommand) {
    acodeAPI.addCommand(name, callback);
  } else if (window && window.acodePlugin) {
    window.acodePlugin.registerCommand(name, callback);
  } else {
    console.log("[AI Helper] Command registered (fallback):", name);
  }
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
