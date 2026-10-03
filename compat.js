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

  const candidateAPIs = [
    acodeAPI.toast,
    acodeAPI.alert,
    acodeAPI.showToast,
    acodeAPI.showAlert
  ];

  for (const fn of candidateAPIs) {
    if (typeof fn === "function") {
      fn.call(acodeAPI, message);
      return;
    }
  }

  if (typeof window !== "undefined" && typeof window.alert === "function") {
    window.alert(message);
    return;
  }

  console.log("[AI Helper]", message);
}

function getSelectedText() {
  if (!acodeAPI) return "";

  const possibleTargets = [
    acodeAPI.editor,
    acodeAPI,
    globalThis.editor,
    globalThis
  ];

  for (const target of possibleTargets) {
    if (!target) continue;

    const methods = [
      target.getSelectedText,
      target.getSelection,
      target.getSelectionText
    ];

    for (const fn of methods) {
      if (typeof fn === "function") {
        const result = fn.call(target);
        if (typeof result === "string") return result;
      }
    }

    if (typeof target.selection === "string") return target.selection;
    if (typeof target.selectedText === "string") return target.selectedText;
  }

  return "";
}

function insertTextIntoEditor(text) {
  if (!acodeAPI) {
    console.log("[AI Helper] Insert:", text);
    return;
  }

  const possibleTargets = [
    acodeAPI.editor,
    acodeAPI,
    globalThis.editor,
    globalThis
  ];

  for (const target of possibleTargets) {
    if (!target) continue;

    const methods = [
      target.insert,
      target.replaceSelection,
      target.insertText,
      target.writeText
    ];

    for (const fn of methods) {
      if (typeof fn === "function") {
        fn.call(target, text);
        return;
      }
    }
  }

  console.log("[AI Helper] Insert (fallback):", text);
}

function promptForValue(title, defaultValue = "") {
  if (!acodeAPI) return defaultValue;

  const candidateAPIs = [
    acodeAPI.prompt,
    acodeAPI.showInputDialog,
    acodeAPI.openPrompt,
    acodeAPI.input
  ];

  for (const fn of candidateAPIs) {
    if (typeof fn === "function") {
      const result = fn.call(acodeAPI, title, defaultValue);
      if (result !== undefined) return result;
    }
  }

  if (typeof window !== "undefined" && typeof window.prompt === "function") {
    return window.prompt(title, defaultValue);
  }

  return defaultValue;
}

function showOutput(text) {
  if (!acodeAPI) {
    console.log("[AI Helper] Output:\n", text);
    return;
  }

  const candidateAPIs = [
    acodeAPI.showModal,
    acodeAPI.dialog,
    acodeAPI.showOutput,
    acodeAPI.openDialog,
    acodeAPI.modal
  ];

  for (const fn of candidateAPIs) {
    if (typeof fn === "function") {
      fn.call(acodeAPI, {
        title: "AI Output",
        body: text,
        message: text
      });
      return;
    }
  }

  console.log("[AI Helper] Output:\n", text);
}

function registerCommand(name, callback) {
  if (!acodeAPI) {
    console.log("[AI Helper] Command registered (offline):", name);
    return;
  }

  const candidateAPIs = [
    acodeAPI.registerCommand,
    acodeAPI.addCommand,
    acodeAPI.register,
    acodeAPI.command
  ];

  for (const fn of candidateAPIs) {
    if (typeof fn === "function") {
      fn.call(acodeAPI, name, callback);
      return;
    }
  }

  if (
    typeof window !== "undefined" &&
    window.acodePlugin &&
    typeof window.acodePlugin.registerCommand === "function"
  ) {
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
