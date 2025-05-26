type ShortcutCallback = () => void;

interface Shortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  callback: ShortcutCallback;
  description: string;
}

class ShortcutService {
  private shortcuts: Map<string, Shortcut> = new Map();
  private isEnabled: boolean = true;

  constructor() {
    this.initializeDefaultShortcuts();
    this.setupEventListeners();
  }

  private initializeDefaultShortcuts() {
    this.registerShortcut({
      key: 's',
      ctrlKey: true,
      callback: () => {
        // Save file
        console.log('Save file');
      },
      description: 'Save current file'
    });

    this.registerShortcut({
      key: 'n',
      ctrlKey: true,
      callback: () => {
        // New file
        console.log('New file');
      },
      description: 'Create new file'
    });

    this.registerShortcut({
      key: 'o',
      ctrlKey: true,
      callback: () => {
        // Open file
        console.log('Open file');
      },
      description: 'Open file'
    });

    this.registerShortcut({
      key: 'f',
      ctrlKey: true,
      callback: () => {
        // Find in file
        console.log('Find in file');
      },
      description: 'Find in file'
    });

    this.registerShortcut({
      key: 'h',
      ctrlKey: true,
      callback: () => {
        // Show help
        console.log('Show help');
      },
      description: 'Show help'
    });
  }

  private setupEventListeners() {
    document.addEventListener('keydown', (event) => {
      if (!this.isEnabled) return;

      const shortcut = this.findMatchingShortcut(event);
      if (shortcut) {
        event.preventDefault();
        shortcut.callback();
      }
    });
  }

  private findMatchingShortcut(event: KeyboardEvent): Shortcut | undefined {
    const key = event.key.toLowerCase();
    return Array.from(this.shortcuts.values()).find(shortcut => 
      shortcut.key.toLowerCase() === key &&
      !!shortcut.ctrlKey === event.ctrlKey &&
      !!shortcut.altKey === event.altKey &&
      !!shortcut.shiftKey === event.shiftKey &&
      !!shortcut.metaKey === event.metaKey
    );
  }

  registerShortcut(shortcut: Shortcut): void {
    const key = this.getShortcutKey(shortcut);
    this.shortcuts.set(key, shortcut);
  }

  unregisterShortcut(shortcut: Shortcut): void {
    const key = this.getShortcutKey(shortcut);
    this.shortcuts.delete(key);
  }

  private getShortcutKey(shortcut: Shortcut): string {
    const modifiers = [
      shortcut.ctrlKey ? 'ctrl' : '',
      shortcut.altKey ? 'alt' : '',
      shortcut.shiftKey ? 'shift' : '',
      shortcut.metaKey ? 'meta' : ''
    ].filter(Boolean).join('+');

    return modifiers ? `${modifiers}+${shortcut.key}` : shortcut.key;
  }

  getAllShortcuts(): Shortcut[] {
    return Array.from(this.shortcuts.values());
  }

  getShortcutDescription(key: string): string | undefined {
    const shortcut = this.shortcuts.get(key);
    return shortcut?.description;
  }

  enable(): void {
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
  }

  isShortcutEnabled(): boolean {
    return this.isEnabled;
  }

  // Custom shortcuts for specific features
  registerEditorShortcuts(editor: any): void {
    this.registerShortcut({
      key: 'f',
      ctrlKey: true,
      callback: () => {
        // Format document
        console.log('Format document');
      },
      description: 'Format document'
    });

    this.registerShortcut({
      key: '/',
      ctrlKey: true,
      callback: () => {
        // Toggle comment
        console.log('Toggle comment');
      },
      description: 'Toggle comment'
    });

    this.registerShortcut({
      key: 'z',
      ctrlKey: true,
      callback: () => {
        // Undo
        console.log('Undo');
      },
      description: 'Undo'
    });

    this.registerShortcut({
      key: 'y',
      ctrlKey: true,
      callback: () => {
        // Redo
        console.log('Redo');
      },
      description: 'Redo'
    });
  }
}

export const shortcutService = new ShortcutService(); 