import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { SearchAddon } from '@xterm/addon-search';
import 'xterm/css/xterm.css';

interface TerminalProps {
  width: string;
  height: string;
}

const Terminal: React.FC<TerminalProps> = ({ width, height }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      const term = new XTerm({
        cursorBlink: true,
        theme: {
          background: '#1e1e1e',
          foreground: '#fff',
          cursor: '#fff',
          black: '#000000',
          red: '#cd3131',
          green: '#0dbc79',
          yellow: '#e5e510',
          blue: '#2472c8',
          magenta: '#bc3fbc',
          cyan: '#11a8cd',
          white: '#e5e5e5',
          brightBlack: '#666666',
          brightRed: '#f14c4c',
          brightGreen: '#23d18b',
          brightYellow: '#f5f543',
          brightBlue: '#3b8eea',
          brightMagenta: '#d670d6',
          brightCyan: '#29b8db',
          brightWhite: '#ffffff'
        },
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: 14,
        lineHeight: 1.2,
        scrollback: 1000,
        convertEol: true
      });

      const fitAddon = new FitAddon();
      const webLinksAddon = new WebLinksAddon();
      const searchAddon = new SearchAddon();

      term.loadAddon(fitAddon);
      term.loadAddon(webLinksAddon);
      term.loadAddon(searchAddon);

      term.open(terminalRef.current);
      fitAddon.fit();

      // Store references
      xtermRef.current = term;
      fitAddonRef.current = fitAddon;

      // Welcome message
      term.writeln('Welcome to CodeRelay Terminal');
      term.writeln('Type "help" for available commands');
      term.write('\r\n$ ');

      // Handle input
      let currentLine = '';
      term.onKey(({ key, domEvent }) => {
        const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

        if (domEvent.keyCode === 13) { // Enter
          term.write('\r\n');
          handleCommand(currentLine);
          currentLine = '';
          term.write('$ ');
        } else if (domEvent.keyCode === 8) { // Backspace
          if (currentLine.length > 0) {
            currentLine = currentLine.slice(0, -1);
            term.write('\b \b');
          }
        } else if (printable) {
          currentLine += key;
          term.write(key);
        }
      });

      // Handle window resize
      const handleResize = () => {
        fitAddon.fit();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        term.dispose();
      };
    }
  }, []);

  const handleCommand = (command: string) => {
    if (!xtermRef.current) return;

    const term = xtermRef.current;
    const cmd = command.trim().toLowerCase();

    switch (cmd) {
      case 'help':
        term.writeln('\r\nAvailable commands:');
        term.writeln('  help     - Show this help message');
        term.writeln('  clear    - Clear the terminal');
        term.writeln('  echo     - Echo the input');
        term.writeln('  exit     - Exit the terminal');
        break;
      case 'clear':
        term.clear();
        break;
      case 'exit':
        term.writeln('\r\nGoodbye!');
        break;
      case '':
        break;
      default:
        if (cmd.startsWith('echo ')) {
          term.writeln(cmd.slice(5));
        } else {
          term.writeln(`\r\nCommand not found: ${cmd}`);
        }
    }
  };

  return (
    <div 
      ref={terminalRef} 
      style={{ 
        width, 
        height,
        backgroundColor: '#1e1e1e',
        padding: '10px'
      }}
    />
  );
};

export default Terminal; 