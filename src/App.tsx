import React, { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const [input, setInput] = useState('');

  // create ref
  const ref = useRef<any>();
  const iframeRef = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) return;

    iframeRef.current.srcDoc = html;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': "'production'",
        global: 'window',
      },
    });

    //    setCode(result.outputFiles[0].text);

    iframeRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      '*'
    );
  };

  const html = `
    <html>
    <head></head>
      <body>
      <div id='root'></div>

      <script>
        try{
          window.addEventListener('message', (event) =>{
         eval(event.data)
        }, false)
        }catch(error){
          const root = document.querySelector('#root')

          root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>error</div>'
        }
      </script>
      </body>
    </html>

  `;

  return (
    <div>
      <textarea
        name='input'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>

      <iframe
        title='preview'
        srcDoc={html}
        sandbox='allow-scripts'
        ref={iframeRef}
      />
    </div>
  );
};

export default App;
