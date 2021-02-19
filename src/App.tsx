import './App.css';

import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';

type info = { imgSrc: string; text: string };

function App() {
  const [infos, setInfos] = useState<info[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [worker, setWorker] = useState(createWorker());

  const handleOnPaste = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    let file = event.clipboardData.items[0].getAsFile();
    let objectUrl = URL.createObjectURL(file);

    setInfos([...infos, { imgSrc: objectUrl, text: "Loading..." }]);

    doOCR(objectUrl);
  };

  const initWorker = async () => {
    setIsLoading(true);
    const initialWorker = createWorker();
    await initialWorker.load();
    await initialWorker.loadLanguage("por+eng");
    await initialWorker.initialize("por+eng");
    setWorker(initialWorker);
    setIsLoading(false);
  };

  const doOCR = async (src: string) => {
    const {
      data: { text },
    } = await worker.recognize(src);
    await worker.terminate();

    // const {
    //   data: { text },
    // } = { data: { text: "This is a very nice test! :D" } };

    const newInfos = [...infos, { imgSrc: src, text: "" }];
    setInfos(newInfos);

    const callInsertText = () => insertText(src, text, newInfos);
    const timeout = 500;
    setTimeout(callInsertText, timeout);
  };

  const insertText = (src: string, text: string, oldInfos: info[]) => {
    const newInfos = [...oldInfos];
    const indexOfSrc = newInfos.findIndex((info) => info.imgSrc === src);
    newInfos[indexOfSrc].text = text;
    setInfos(newInfos);
  };

  //=========================
  useEffect(() => {
    initWorker();
  }, []);

  function getLoading() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading ...
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        getLoading()
      ) : (
        <div onPaste={handleOnPaste}>
          <h1>Paste image and get text</h1>

          {infos.map((info: info, idx: number) => {
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
                  <img src={info.imgSrc} alt="Pasted information" />
                </div>
                <div className="texts-container">
                  <p>{info.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
