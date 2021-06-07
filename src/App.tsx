import React, { useState, useEffect, useRef } from 'react';
import bundler from './bundler';

import CodeEditor from './components/code-editor';
import Preview from './components/preview';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');


  const onClick = async () => {
    const output = await bundler(input);

    setCode(output);
  };

  return (
    <div>
      <CodeEditor initialValue='d' onChange={(value) => setInput(value)} />

      <div>
        <button onClick={onClick}>Submit</button>
      </div>

      <Preview code={code} />
    </div>
  );
};

export default App;
