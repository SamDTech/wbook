import React, { useRef, useEffect } from 'react';

interface PreviewProps {
  code: string;
}

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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcDoc = html; 

    iframeRef.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <iframe
      title='preview'
      srcDoc={html}
      sandbox='allow-scripts'
      ref={iframeRef}
    />
  );
};

export default Preview;
