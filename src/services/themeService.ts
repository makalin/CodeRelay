interface Theme {
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    error: string;
    warning: string;
    success: string;
    editor: {
      background: string;
      foreground: string;
      selection: string;
      lineHighlight: string;
      cursor: string;
      findMatch: string;
      findMatchHighlight: string;
      gutter: {
        background: string;
        foreground: string;
      };
    };
    terminal: {
      background: string;
      foreground: string;
      cursor: string;
      selection: string;
    };
    chat: {
      background: string;
      foreground: string;
      userMessage: string;
      assistantMessage: string;
      timestamp: string;
    };
  };
}

class ThemeService {
  private currentTheme: Theme;
  private themes: Map<string, Theme> = new Map();
  private themeChangeCallbacks: ((theme: Theme) => void)[] = [];

  constructor() {
    this.initializeThemes();
    this.currentTheme = this.themes.get('dark')!;
    this.applyTheme(this.currentTheme);
  }

  private initializeThemes() {
    // Dark theme
    this.themes.set('dark', {
      name: 'Dark',
      colors: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        primary: '#007acc',
        secondary: '#6c757d',
        accent: '#9cdcfe',
        error: '#f14c4c',
        warning: '#cca700',
        success: '#6a9955',
        editor: {
          background: '#1e1e1e',
          foreground: '#d4d4d4',
          selection: '#264f78',
          lineHighlight: '#2a2d2e',
          cursor: '#d4d4d4',
          findMatch: '#515c6a',
          findMatchHighlight: '#6a9955',
          gutter: {
            background: '#1e1e1e',
            foreground: '#858585'
          }
        },
        terminal: {
          background: '#1e1e1e',
          foreground: '#d4d4d4',
          cursor: '#d4d4d4',
          selection: '#264f78'
        },
        chat: {
          background: '#1e1e1e',
          foreground: '#d4d4d4',
          userMessage: '#2d2d2d',
          assistantMessage: '#252526',
          timestamp: '#6c757d'
        }
      }
    });

    // Light theme
    this.themes.set('light', {
      name: 'Light',
      colors: {
        background: '#ffffff',
        foreground: '#333333',
        primary: '#007acc',
        secondary: '#6c757d',
        accent: '#0078d4',
        error: '#dc3545',
        warning: '#ffc107',
        success: '#28a745',
        editor: {
          background: '#ffffff',
          foreground: '#333333',
          selection: '#add6ff',
          lineHighlight: '#f0f0f0',
          cursor: '#333333',
          findMatch: '#e8e8e8',
          findMatchHighlight: '#a8d08d',
          gutter: {
            background: '#f3f3f3',
            foreground: '#999999'
          }
        },
        terminal: {
          background: '#ffffff',
          foreground: '#333333',
          cursor: '#333333',
          selection: '#add6ff'
        },
        chat: {
          background: '#ffffff',
          foreground: '#333333',
          userMessage: '#f8f9fa',
          assistantMessage: '#ffffff',
          timestamp: '#6c757d'
        }
      }
    });

    // High contrast theme
    this.themes.set('high-contrast', {
      name: 'High Contrast',
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        primary: '#ffff00',
        secondary: '#00ff00',
        accent: '#00ffff',
        error: '#ff0000',
        warning: '#ffff00',
        success: '#00ff00',
        editor: {
          background: '#000000',
          foreground: '#ffffff',
          selection: '#ffff00',
          lineHighlight: '#1a1a1a',
          cursor: '#ffffff',
          findMatch: '#ffff00',
          findMatchHighlight: '#00ff00',
          gutter: {
            background: '#000000',
            foreground: '#ffffff'
          }
        },
        terminal: {
          background: '#000000',
          foreground: '#ffffff',
          cursor: '#ffffff',
          selection: '#ffff00'
        },
        chat: {
          background: '#000000',
          foreground: '#ffffff',
          userMessage: '#1a1a1a',
          assistantMessage: '#000000',
          timestamp: '#00ff00'
        }
      }
    });
  }

  private applyTheme(theme: Theme) {
    const root = document.documentElement;
    
    // Apply CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(`--${key}`, value);
      } else {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'string') {
            root.style.setProperty(`--${key}-${subKey}`, subValue);
          } else {
            Object.entries(subValue).forEach(([nestedKey, nestedValue]) => {
              root.style.setProperty(`--${key}-${subKey}-${nestedKey}`, nestedValue as string);
            });
          }
        });
      }
    });

    // Notify subscribers
    this.themeChangeCallbacks.forEach(callback => callback(theme));
  }

  setTheme(themeName: string) {
    const theme = this.themes.get(themeName);
    if (theme) {
      this.currentTheme = theme;
      this.applyTheme(theme);
      localStorage.setItem('preferred-theme', themeName);
    }
  }

  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  getAvailableThemes(): string[] {
    return Array.from(this.themes.keys());
  }

  onThemeChange(callback: (theme: Theme) => void) {
    this.themeChangeCallbacks.push(callback);
    return () => {
      this.themeChangeCallbacks = this.themeChangeCallbacks.filter(cb => cb !== callback);
    };
  }

  // Utility method to generate a color palette based on a base color
  generateColorPalette(baseColor: string): string[] {
    // This is a simple implementation - you might want to use a color library
    // for more sophisticated color manipulation
    const colors: string[] = [];
    const base = this.hexToRgb(baseColor);
    
    if (base) {
      // Generate lighter shades
      for (let i = 1; i <= 4; i++) {
        colors.push(this.lightenColor(base, i * 0.2));
      }
      
      // Add base color
      colors.push(baseColor);
      
      // Generate darker shades
      for (let i = 1; i <= 4; i++) {
        colors.push(this.darkenColor(base, i * 0.2));
      }
    }
    
    return colors;
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private lightenColor(color: { r: number; g: number; b: number }, amount: number): string {
    return `rgb(${Math.min(255, Math.round(color.r + (255 - color.r) * amount))}, 
                ${Math.min(255, Math.round(color.g + (255 - color.g) * amount))}, 
                ${Math.min(255, Math.round(color.b + (255 - color.b) * amount))})`;
  }

  private darkenColor(color: { r: number; g: number; b: number }, amount: number): string {
    return `rgb(${Math.max(0, Math.round(color.r * (1 - amount)))}, 
                ${Math.max(0, Math.round(color.g * (1 - amount)))}, 
                ${Math.max(0, Math.round(color.b * (1 - amount)))})`;
  }
}

export const themeService = new ThemeService(); 