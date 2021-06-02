import React, { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  // create ref
  const ref = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = () => {
    if (!ref.current) return;

    console.log(ref.current);
  };
  return (
    <div>
      <textarea
        name="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>

      <pre>{code}</pre>
    </div>
  );
};

export default App;
