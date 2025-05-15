# CodeRelay (CR)

> A minimalist, multi-pane source code editor blending code, chat, and terminal into one elegant workspace.

---

## �� Features

- 🖊️ **Notepad-like Code Panel** – Fast, distraction-free editing with Monaco Editor
  - New/Open/Save file operations (supports .txt, .js, .ts, .jsx, .tsx, .html, .css, .json)
  - Syntax highlighting, auto-indentation, bracket matching, and more
- 💬 **Chat Panel** – Built-in AI assistant (OpenAI or mock, configurable)
  - Send messages and get instant AI responses
- 💻 **Terminal Panel** – Interactive shell-like terminal (xterm.js)
  - Supports basic commands: `help`, `clear`, `echo`, `exit`
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
- **New File:** Click `New` to start a blank file.
- **Open File:** Click `Open` to load a `.txt`, `.js`, `.ts`, `.jsx`, `.tsx`, `.html`, `.css`, or `.json` file.
- **Save File:** Click `Save` or use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>S</kbd> to download the current file.
- **Syntax Highlighting:** Automatically detects language based on file extension.
- **Performance:** Optimized for fast typing and large files.

### Chat Panel (AI Assistant)
- **Send a message:** Type and press `Send` or <kbd>Enter</kbd>.
- **API Setup:**
  - To use OpenAI, create a `.env` file in the project root:
    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```
  - By default, a mock AI is used for development/testing.

### Terminal Panel
- **Commands:**
  - `help` – Show available commands
  - `clear` – Clear the terminal
  - `echo <text>` – Print text
  - `exit` – Print goodbye message
- **Note:** This is a simulated shell for demonstration, not a real system shell.

---

## 🛠️ Tech Stack

* ⚙️ **Electron** – Cross-platform desktop support
* 🎨 **Vite + React** – Lightning-fast UI rendering
* 🧠 **Chat Integration** – OpenAI API / Mock LLM
* 🖥️ **xterm.js** – Embedded terminal support
* 💾 **Monaco Editor** – Notepad-like code editing

---

## 🌐 Roadmap

* [x] Notepad-like code editing (New/Open/Save)
* [x] Fast Monaco Editor integration
* [x] Terminal with basic commands
* [x] AI Chat API integration (OpenAI/Mock)
* [ ] Theme support
* [ ] Plugin system
* [ ] Custom keybindings
* [ ] Cloud sync support

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

MIT © [Your Name](https://github.com/makalin)

---

## 💬 Inspiration

CR was inspired by the idea that a modern code editor should do more than just edit code. CodeRelay merges editing, communication, and execution in a beautifully minimal interface.
