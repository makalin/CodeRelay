interface EditorSettings {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  tabSize: number;
  insertSpaces: boolean;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
  autoSave: boolean;
  formatOnSave: boolean;
  formatOnPaste: boolean;
  suggestOnTriggerCharacters: boolean;
  acceptSuggestionOnEnter: boolean;
  quickSuggestions: boolean;
}

interface TerminalSettings {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  cursorBlink: boolean;
  cursorStyle: 'block' | 'line' | 'underline';
  scrollback: number;
  copyOnSelection: boolean;
  rightClickSelectsWord: boolean;
}

interface ChatSettings {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  messageSpacing: number;
  showTimestamps: boolean;
  showUserAvatars: boolean;
  showCodeHighlighting: boolean;
  maxMessageLength: number;
}

interface Settings {
  editor: EditorSettings;
  terminal: TerminalSettings;
  chat: ChatSettings;
  theme: string;
  language: string;
  autoUpdate: boolean;
  telemetry: boolean;
}

class SettingsService {
  private settings: Settings;
  private settingsChangeCallbacks: ((settings: Settings) => void)[] = [];

  constructor() {
    this.settings = this.loadSettings();
  }

  private defaultSettings: Settings = {
    editor: {
      fontSize: 14,
      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
      lineHeight: 1.5,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: false,
      minimap: true,
      lineNumbers: true,
      autoSave: true,
      formatOnSave: true,
      formatOnPaste: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: true,
      quickSuggestions: true
    },
    terminal: {
      fontSize: 14,
      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
      lineHeight: 1.2,
      cursorBlink: true,
      cursorStyle: 'block',
      scrollback: 1000,
      copyOnSelection: true,
      rightClickSelectsWord: true
    },
    chat: {
      fontSize: 14,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: 1.5,
      messageSpacing: 16,
      showTimestamps: true,
      showUserAvatars: true,
      showCodeHighlighting: true,
      maxMessageLength: 1000
    },
    theme: 'dark',
    language: 'en',
    autoUpdate: true,
    telemetry: false
  };

  private loadSettings(): Settings {
    try {
      const savedSettings = localStorage.getItem('settings');
      if (savedSettings) {
        return { ...this.defaultSettings, ...JSON.parse(savedSettings) };
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
    return this.defaultSettings;
  }

  private saveSettings() {
    try {
      localStorage.setItem('settings', JSON.stringify(this.settings));
      this.settingsChangeCallbacks.forEach(callback => callback(this.settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }

  getSettings(): Settings {
    return { ...this.settings };
  }

  getEditorSettings(): EditorSettings {
    return { ...this.settings.editor };
  }

  getTerminalSettings(): TerminalSettings {
    return { ...this.settings.terminal };
  }

  getChatSettings(): ChatSettings {
    return { ...this.settings.chat };
  }

  updateSettings(newSettings: Partial<Settings>) {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettings();
  }

  updateEditorSettings(newSettings: Partial<EditorSettings>) {
    this.settings.editor = { ...this.settings.editor, ...newSettings };
    this.saveSettings();
  }

  updateTerminalSettings(newSettings: Partial<TerminalSettings>) {
    this.settings.terminal = { ...this.settings.terminal, ...newSettings };
    this.saveSettings();
  }

  updateChatSettings(newSettings: Partial<ChatSettings>) {
    this.settings.chat = { ...this.settings.chat, ...newSettings };
    this.saveSettings();
  }

  resetSettings() {
    this.settings = { ...this.defaultSettings };
    this.saveSettings();
  }

  onSettingsChange(callback: (settings: Settings) => void) {
    this.settingsChangeCallbacks.push(callback);
    return () => {
      this.settingsChangeCallbacks = this.settingsChangeCallbacks.filter(cb => cb !== callback);
    };
  }

  // Utility methods for specific settings
  setTheme(theme: string) {
    this.settings.theme = theme;
    this.saveSettings();
  }

  setLanguage(language: string) {
    this.settings.language = language;
    this.saveSettings();
  }

  setAutoUpdate(enabled: boolean) {
    this.settings.autoUpdate = enabled;
    this.saveSettings();
  }

  setTelemetry(enabled: boolean) {
    this.settings.telemetry = enabled;
    this.saveSettings();
  }

  // Export settings to file
  exportSettings(): string {
    return JSON.stringify(this.settings, null, 2);
  }

  // Import settings from file
  importSettings(settingsJson: string): boolean {
    try {
      const importedSettings = JSON.parse(settingsJson);
      this.settings = { ...this.defaultSettings, ...importedSettings };
      this.saveSettings();
      return true;
    } catch (error) {
      console.error('Error importing settings:', error);
      return false;
    }
  }
}

export const settingsService = new SettingsService(); 