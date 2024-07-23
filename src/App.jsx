import { useCallback, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { bespin } from '@uiw/codemirror-theme-bespin';
import './App.css'

const defHTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body{font-family: 'Segoe UI', sans-serif}
      kbd{background-color: #ddd; padding: 2px 4px; border-radius: 4px}
    </style>
  </head>
  <body>
    <h1>Welcome To Coderer!</h1>
    <p>Try change code and hit <kbd>CTRL</kbd> + <kbd>S</kbd> to see changes.</p>
  </body>
</html>
<!--
  Editor as Codemirror And Bespin theme
  Build With React ⚛
  The code is kept in Browser's Local Storage
-->`

function App() {
  const storedCode = localStorage.getItem('coderecode');
  const storedFontSize = localStorage.getItem('coderefs');

  const [fontSize, setFontSize] = useState(parseInt(storedFontSize));
  const [code, setCode] = useState(storedCode ?? defHTML);
  const [savedNotf, setSavedNotf] = useState(false);
  const [savedCode, setSavedCode] = useState(code);

  const onChange = useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);

  const handleKP = (event) => {
    //handle save code to localstorage
    if(event.ctrlKey && event.code == 'KeyS'){
      event.preventDefault();
      localStorage.setItem('coderecode', code);
      setSavedCode(code);
      setSavedNotf(true);
      setTimeout(() => {
        setSavedNotf(false);
      }, 1000);
    }
  }

  return (
    <>
      <div className="controls">
        <div>
          <span>Font Size</span>
          <input
            type="number"
            min="8"
            max="40"
            value={fontSize || 16}
            onChange={(e) => {
              setFontSize(parseInt(e.target.value));
              localStorage.setItem('coderefs', parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <span style={{ display: savedNotf ? 'inline-block' : 'none' }}>Saved</span>
        </div>
        <div>
          <p><a href="https://github.com/mgbdevp/coderer">Github</a></p>
        </div>
      </div>

      <div className="flex">
        <CodeMirror
          style={{ fontSize: fontSize || 16 }}
          value={code}
          height="calc(100vh - 48px)"
          width="62vw"
          autoFocus={true}
          theme={bespin}
          extensions={[html(), css()]}
          onChange={onChange}
          onKeyDown={handleKP}
        />
        <div className="iframecontainer">
          <iframe
            allow="clipboard-read; clipboard-write"
            sandbox="allow-scripts"
            style={{ backgroundColor: 'white', border: 'none' }}
            srcDoc={savedCode}
          >
          </iframe>
        </div>
      </div>
    </>
  );
}

export default App
