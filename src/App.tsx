import { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Chat from './components/Chat';
import Terminal from './components/Terminal';
import './App.css';

function App() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const editorWidth = `${dimensions.width * 0.8}px`;
  const rightPanelWidth = `${dimensions.width * 0.2}px`;
  const chatHeight = `${dimensions.height * 0.6}px`;
  const terminalHeight = `${dimensions.height * 0.4}px`;

  return (
    <div className="app-container">
      <div className="left-panel">
        <Editor width={editorWidth} height={`${dimensions.height}px`} />
      </div>
      <div className="right-panel">
        <div className="chat-container">
          <Chat width={rightPanelWidth} height={chatHeight} />
        </div>
        <div className="terminal-container">
          <Terminal width={rightPanelWidth} height={terminalHeight} />
        </div>
      </div>
    </div>
  );
}

export default App; 