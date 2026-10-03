# Acode AI Helper

A mobile-friendly, public-safe starter plugin for Acode that adds lightweight AI assistance directly inside the editor.

## Features

- Explain selected code
- Generate code from a prompt
- Refactor selected code
- OpenAI API key configuration
- Local settings storage
- Cross-version compatibility wrapper for different Acode mobile builds

## Why this project exists

This plugin is designed as a community-friendly utility that helps developers use AI features in Acode without hardcoding API keys or depending on a single Acode API shape.

## Public-safe note

This plugin sends selected code or prompts to the OpenAI API. That means:
- users must provide their own API key
- the key should not be baked into the source code
- you should not expose sensitive data in public repositories
- for production/public distribution, consider a backend proxy for added safety

## Starter project structure

```text
acode-ai-helper/
├── plugin.json
├── main.js
├── settings.js
├── api.js
├── compat.js
├── README.md
├── LICENSE
├── .gitignore
└── package.json
```

## Quick start

1. Clone the repository.
2. Add your OpenAI API key in the plugin settings.
3. Choose a model.
4. Select code or type a prompt.
5. Run one of the commands.

## Commands

- ai.explainSelected
- ai.generatePrompt
- ai.refactorSelected
- ai.openSettings

## Compatibility approach

The `compat.js` file isolates all Acode version-specific calls, including:
- notifications
- prompts
- editor text access
- inserting text
- command registration
- output display

This design helps the plugin work across multiple Acode mobile builds.

## Important implementation note

The generic compatibility layer is intentionally designed to be adapted to the exact Acode environment you are targeting. Some Acode versions expose objects like `acode`, `editor`, or `plugin`, while others use slightly different naming.

The project is intended to be a starter for public release, not a strict production package out of the box.

## License

MIT
