# CodeRelay (CR)

> A minimalist, multi-pane source code editor blending code, chat, and terminal into one elegant workspace.

---

## 🎯 Features

- 🖊️ **Notepad-like Code Panel** – Fast, distraction-free editing with Monaco Editor
  - New/Open/Save file operations (supports .txt, .js, .ts, .jsx, .tsx, .html, .css, .json)
  - Syntax highlighting, auto-indentation, bracket matching, and more
  - Code analysis and metrics (complexity, functions, classes, etc.)
  - Code formatting and improvement suggestions
- 💬 **Chat Panel** – Built-in AI assistant (OpenAI or mock, configurable)
  - Send messages and get instant AI responses
  - Code snippet sharing and management
  - Message history and search
- 💻 **Terminal Panel** – Interactive shell-like terminal (xterm.js)
  - Supports basic commands: `help`, `clear`, `echo`, `exit`
  - Customizable appearance and behavior
- 🎨 **Theme System**
  - Dark, Light, and High Contrast themes
  - Custom color palette generation
  - Theme persistence and auto-detection
- ⚙️ **Settings Management**
  - Editor, Terminal, and Chat preferences
  - Keyboard shortcuts customization
  - Settings import/export
- ⌨️ **Keyboard Shortcuts**
  - Global and component-specific shortcuts
  - Customizable key bindings
  - Shortcut help and documentation
- 📦 **File Management**
  - Advanced file operations
  - File watching and history
  - Directory navigation and search
- 🧩 **Code Snippets**
  - Snippet library with templates
  - Language-specific snippets
  - Snippet import/export
- 🧠 **AI Prompt Support** – Connect to OpenAI or use a local mock LLM
- 🌙 **Dark & Light Themes** – With auto system detection
- ⚡ **Cross-platform** – Runs on Windows, macOS, Linux

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/makalin/CodeRelay.git
cd CodeRelay
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in development mode

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## 📝 Usage Notes

### Code Editor (Notepad Mode)
- **New File:** Click `New` or use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>N</kbd>
- **Open File:** Click `Open` or use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>O</kbd>
- **Save File:** Click `Save` or use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>S</kbd>
- **Find in File:** Use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>F</kbd>
- **Format Document:** Use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd>
- **Toggle Comment:** Use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>/</kbd>
- **Undo/Redo:** Use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>Z</kbd>/<kbd>Y</kbd>

### Chat Panel (AI Assistant)
- **Send a message:** Type and press `Send` or <kbd>Enter</kbd>
- **API Setup:**
  - To use OpenAI, create a `.env` file in the project root:
    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```
  - By default, a mock AI is used for development/testing

### Terminal Panel
- **Commands:**
  - `help` – Show available commands
  - `clear` – Clear the terminal
  - `echo <text>` – Print text
  - `exit` – Print goodbye message
- **Note:** This is a simulated shell for demonstration, not a real system shell

### Settings & Customization
- **Theme Selection:** Choose from Dark, Light, or High Contrast themes
- **Editor Settings:** Customize font, size, line height, and more
- **Terminal Settings:** Adjust appearance and behavior
- **Chat Settings:** Configure message display and formatting
- **Keyboard Shortcuts:** View and customize key bindings

---

## 🛠️ Tech Stack

* ⚙️ **Electron** – Cross-platform desktop support
* 🎨 **Vite + React** – Lightning-fast UI rendering
* 🧠 **Chat Integration** – OpenAI API / Mock LLM
* 🖥️ **xterm.js** – Embedded terminal support
* 💾 **Monaco Editor** – Notepad-like code editing
* 🎯 **TypeScript** – Type-safe development
* 📦 **File System** – Advanced file operations
* 🎨 **Theme System** – Customizable appearance
* ⌨️ **Shortcut Manager** – Keyboard shortcuts
* ⚙️ **Settings Manager** – User preferences

---

## 🌐 Roadmap

* [x] Notepad-like code editing (New/Open/Save)
* [x] Fast Monaco Editor integration
* [x] Terminal with basic commands
* [x] AI Chat API integration (OpenAI/Mock)
* [x] Theme support
* [x] Settings management
* [x] Keyboard shortcuts
* [x] Code analysis and metrics
* [x] Snippet management
* [ ] Plugin system
* [ ] Cloud sync support
* [ ] Git integration
* [ ] Debug support

---

## 🤝 Contributing

Pull requests, suggestions, and feedback are welcome!

```bash
git checkout -b feature/my-feature
git commit -m "Add amazing feature"
git push origin feature/my-feature
```

---

## 📄 License

MIT © [Mehmet T. AKALIN](https://github.com/makalin)

---

## 💬 Inspiration

CR was inspired by the idea that a modern code editor should do more than just edit code. CodeRelay merges editing, communication, and execution in a beautifully minimal interface.
