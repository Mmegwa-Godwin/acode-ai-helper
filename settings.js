const STORAGE_KEY = "acode_ai_helper_settings";

function getDefaultSettings() {
  return {
    apiKey: "",
    model: "gpt-4o-mini"
  };
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultSettings();

    return {
      ...getDefaultSettings(),
      ...JSON.parse(raw)
    };
  } catch (err) {
    return getDefaultSettings();
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function getApiKey() {
  return loadSettings().apiKey || "";
}

function setApiKey(apiKey) {
  const settings = loadSettings();
  settings.apiKey = apiKey;
  saveSettings(settings);
}

function getModel() {
  return loadSettings().model || "gpt-4o-mini";
}

function setModel(model) {
  const settings = loadSettings();
  settings.model = model;
  saveSettings(settings);
}

module.exports = {
  loadSettings,
  saveSettings,
  getApiKey,
  setApiKey,
  getModel,
  setModel
};
