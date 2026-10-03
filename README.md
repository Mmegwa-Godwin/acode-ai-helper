# Acode AI Helper

A lightweight AI helper plugin for Acode that helps developers:
- explain selected code
- generate code from a prompt
- refactor selected code
- store OpenAI API settings locally

## Important notes

This project is a starter MVP and a public-safe contribution template. It is intentionally simple and built to be easy to adapt to the exact Acode plugin API that your environment supports.

### Privacy note
This plugin sends code or prompts to the OpenAI API. Do not hardcode your API key into the source code. Use a secure local setting flow or a backend proxy for production-grade public release.

## Project structure

```text
acode-ai-helper/
├── plugin.json
├── main.js
├── settings.js
├── api.js
├── README.md
└── .gitignore
```

## Features

- Explain selected code
- Generate code from a prompt
- Refactor selected code
- Model selection through settings
- Local storage for API key and model name

## How to use

1. Open the plugin settings.
2. Add your OpenAI API key.
3. Choose the model you want to use.
4. Run one of the plugin commands:
   - Explain selected code
   - Generate from prompt
   - Refactor selected code

## Important implementation note

The file placeholders for:
- getting selected text
- inserting text back into the editor
- popup or modal messages
- command registration

must be replaced with the actual Acode plugin API in your version of the editor.

## Example command ideas

- ai.explainSelected
- ai.generatePrompt
- ai.refactorSelected
- ai.openSettings

## License

MIT
