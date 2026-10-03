const { getApiKey, setApiKey, getModel, setModel } = require("./settings");
const { generateCompletion } = require("./api");

function showMessage(message) {
  // Replace this with Acode's notification API if available.
  // Example:
  // acode.toast(message);
  console.log("[Acode AI Helper]", message);
}

function promptForValue(title, defaultValue = "") {
  // Replace this with the actual Acode input dialog API.
  // Example:
  // return acode.prompt(title, defaultValue);
  return defaultValue;
}

function getSelectedText() {
  // Replace this with the Acode editor API for getting selected text.
  // Example:
  // return editor.getSelectedText();
  return "";
}

function insertTextIntoEditor(text) {
  // Replace this with the Acode editor API for inserting or replacing text.
  // Example:
  // editor.insert(text);
  console.log("[Acode AI Helper] Inserted text:\n", text);
}

function showOutput(text) {
  // Replace with Acode output panel / dialog / modal support.
  console.log("[Acode AI Helper] Output:\n", text);
}

async function explainSelectedCode() {
  const code = getSelectedText();

  if (!code || !code.trim()) {
    showMessage("Select some code first.");
    return;
  }

  const apiKey = getApiKey();

  if (!apiKey) {
    showMessage("Add your OpenAI API key in plugin settings first.");
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

// Replace these with Acode's actual command registration API.
// Example:
// acode.registerCommand("ai.explainSelected", explainSelectedCode);
// acode.registerCommand("ai.generatePrompt", generateFromPrompt);
// acode.registerCommand("ai.refactorSelected", refactorSelectedCode);
// acode.registerCommand("ai.openSettings", openSettings);

console.log("[Acode AI Helper] Plugin loaded.");

module.exports = {
  explainSelectedCode,
  generateFromPrompt,
  refactorSelectedCode,
  openSettings
};
