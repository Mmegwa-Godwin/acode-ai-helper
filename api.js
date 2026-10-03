const { getApiKey, getModel } = require("./settings");

async function generateCompletion(prompt, options = {}) {
  const apiKey = options.apiKey || getApiKey();
  const model = options.model || getModel();

  if (!apiKey) {
    throw new Error("OpenAI API key is missing. Add it in plugin settings.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful coding assistant. Give concise, practical, accurate answers. Prefer code-only output when the user asks for code."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`AI request failed: ${response.status} ${text}`);
  }

  const data = await response.json();

  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error("Unexpected AI response format.");
  }

  return data.choices[0].message.content.trim();
}

module.exports = {
  generateCompletion
};
