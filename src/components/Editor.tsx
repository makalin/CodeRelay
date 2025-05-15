import { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';

interface EditorProps {
  width: string;
  height: string;
}

const Editor: React.FC<EditorProps> = ({ width, height }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [currentFile, setCurrentFile] = useState<string>('untitled.txt');

  useEffect(() => {
    if (editorRef.current) {
      monacoEditorRef.current = monaco.editor.create(editorRef.current, {
        value: '// Start coding here...',
        language: 'plaintext',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: {
          enabled: true
        },
        wordWrap: 'on',
        lineNumbers: 'on',
        fontSize: 14,
        tabSize: 2,
        scrollBeyondLastLine: false,
        renderWhitespace: 'selection',
        lineHeight: 20,
        cursorStyle: 'line',
        cursorBlinking: 'blink',
        cursorSmoothCaretAnimation: 'on',
        smoothScrolling: true,
        mouseWheelZoom: true,
        multiCursorModifier: 'alt',
        quickSuggestions: true,
        acceptSuggestionOnEnter: 'on',
        formatOnPaste: true,
        formatOnType: true,
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        autoIndent: 'full',
        folding: true,
        foldingStrategy: 'indentation',
        showFoldingControls: 'always',
        matchBrackets: 'always',
        renderLineHighlight: 'all',
        guides: {
          indentation: true,
          highlightActiveIndentation: true,
          bracketPairs: true
        }
      });

      // Add keyboard shortcuts
      monacoEditorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        saveFile();
      });

      monacoEditorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyN, () => {
        newFile();
      });

      // Handle window resize
      const handleResize = () => {
        monacoEditorRef.current?.layout();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        monacoEditorRef.current?.dispose();
      };
    }
  }, []);

  const saveFile = () => {
    if (monacoEditorRef.current) {
      const content = monacoEditorRef.current.getValue();
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = currentFile;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const newFile = () => {
    if (monacoEditorRef.current) {
      monacoEditorRef.current.setValue('');
      setCurrentFile('untitled.txt');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (monacoEditorRef.current && e.target?.result) {
          monacoEditorRef.current.setValue(e.target.result as string);
          setCurrentFile(file.name);
          
          // Set language based on file extension
          const extension = file.name.split('.').pop()?.toLowerCase();
          const language = getLanguageFromExtension(extension);
          monaco.editor.setModelLanguage(monacoEditorRef.current.getModel()!, language);
        }
      };
      reader.readAsText(file);
    }
  };

  const getLanguageFromExtension = (extension?: string): string => {
    switch (extension) {
      case 'js': return 'javascript';
      case 'ts': return 'typescript';
      case 'jsx': return 'javascript';
      case 'tsx': return 'typescript';
      case 'html': return 'html';
      case 'css': return 'css';
      case 'json': return 'json';
      default: return 'plaintext';
    }
  };

  return (
    <div style={{ width, height, display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        padding: '8px', 
        backgroundColor: '#252526',
        borderBottom: '1px solid #333',
        display: 'flex',
        gap: '8px'
      }}>
        <button
          onClick={newFile}
          style={{
            padding: '4px 8px',
            backgroundColor: '#007acc',
            border: 'none',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          New
        </button>
        <input
          type="file"
          accept=".txt,.js,.ts,.jsx,.tsx,.html,.css,.json"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-input"
        />
        <button
          onClick={() => document.getElementById('file-input')?.click()}
          style={{
            padding: '4px 8px',
            backgroundColor: '#007acc',
            border: 'none',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Open
        </button>
        <button
          onClick={saveFile}
          style={{
            padding: '4px 8px',
            backgroundColor: '#007acc',
            border: 'none',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Save
        </button>
        <span style={{ color: '#fff', marginLeft: '8px' }}>{currentFile}</span>
      </div>
      <div 
        ref={editorRef} 
        style={{ 
          flex: 1,
          borderRight: '1px solid #333'
        }}
      />
    </div>
  );
};

export default Editor; 