const { getApiKey, setApiKey, getModel, setModel } = require("./settings");
const { generateCompletion } = require("./api");
const {
  setAcodeAPI,
  showMessage,
  getSelectedText,
  insertTextIntoEditor,
  promptForValue,
  showOutput,
  registerCommand
} = require("./compat");

function initAcodeBridge() {
  if (typeof acode !== "undefined") {
    setAcodeAPI(acode);
    return;
  }

  if (typeof plugin !== "undefined") {
    setAcodeAPI(plugin);
    return;
  }

  if (typeof window !== "undefined" && window.acode) {
    setAcodeAPI(window.acode);
  }
}

async function explainSelectedCode() {
  const code = getSelectedText();

  if (!code || !code.trim()) {
    showMessage("Select some code first.");
    return;
  }

  const apiKey = getApiKey();

  if (!apiKey) {
    showMessage("Add your OpenAI API key in the plugin settings first.");
    return;
  }

  try {
    showMessage("Explaining selected code...");
    const result = await generateCompletion(
      `Explain this code clearly and simply for a developer:\n\n${code}`,
      { apiKey }
    );

    showOutput(result);
  } catch (err) {
    showMessage(err.message || "Something went wrong while explaining the code.");
  }
}

async function generateFromPrompt() {
  const prompt = promptForValue(
    "Ask the AI to generate code",
    "Create a Python function that reads a JSON file and prints the keys."
  );

  if (!prompt || !prompt.trim()) {
    showMessage("Prompt cannot be empty.");
    return;
  }

  const apiKey = getApiKey();

  if (!apiKey) {
    showMessage("Add your OpenAI API key first.");
    return;
  }

  try {
    showMessage("Generating code...");
    const result = await generateCompletion(prompt, { apiKey });
    showOutput(result);
    // insertTextIntoEditor(result);
  } catch (err) {
    showMessage(err.message || "Something went wrong while generating code.");
  }
}

async function refactorSelectedCode() {
  const code = getSelectedText();

  if (!code || !code.trim()) {
    showMessage("Select code to refactor.");
    return;
  }

  const apiKey = getApiKey();

  if (!apiKey) {
    showMessage("Add your OpenAI API key first.");
    return;
  }

  try {
    showMessage("Refactoring selected code...");
    const result = await generateCompletion(
      `Refactor this code to be cleaner, safer, and more production-ready while keeping the same logic:\n\n${code}`,
      { apiKey }
    );

    showOutput(result);
    // insertTextIntoEditor(result);
  } catch (err) {
    showMessage(err.message || "Something went wrong while refactoring the code.");
  }
}

function openSettings() {
  const currentSettings = {
    apiKey: getApiKey(),
    model: getModel()
  };

  const apiKey = promptForValue("OpenAI API key", currentSettings.apiKey);
  const model = promptForValue("Model", currentSettings.model);

  if (apiKey !== undefined) {
    setApiKey(apiKey.trim());
  }

  if (model && model.trim()) {
    setModel(model.trim());
  }

  showMessage("Settings saved.");
}

initAcodeBridge();

registerCommand("ai.explainSelected", explainSelectedCode);
registerCommand("ai.generatePrompt", generateFromPrompt);
registerCommand("ai.refactorSelected", refactorSelectedCode);
registerCommand("ai.openSettings", openSettings);

console.log("[Acode AI Helper] Plugin loaded.");

module.exports = {
  explainSelectedCode,
  generateFromPrompt,
  refactorSelectedCode,
  openSettings,
  initAcodeBridge
};
