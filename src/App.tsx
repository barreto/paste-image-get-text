import './App.css';

import React, { useState } from 'react';

// Caso esteja compartilhando tela não estamos vendo, professor

function App() {
  const [images, setImages] = useState<string[]>([]);

  const handleOnPaste = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    let file = event.clipboardData.items[0].getAsFile();
    let objectUrl = URL.createObjectURL(file);

    setImages([...images, objectUrl]);
  };

  return (
    <div onPaste={handleOnPaste}>
      <h1>Paste image and get text</h1>

      {images.map((imgSrc: string, idx: number) => {
        // return <img src={imgSrc} />;
        return (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "8px",
            }}
          >
            <div className="images-container">
              <img src={imgSrc} />
            </div>
            <div className="texts-container">
              <textarea cols={30} rows={10} value="test next line"></textarea>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
