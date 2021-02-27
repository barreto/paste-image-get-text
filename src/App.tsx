import './App.css';

import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';

import { ReactComponent as CopyIcon } from './assets/icons/copy.svg';
import Loading from './components/Loading';
import ParstedItem from './components/PastedContainer';

type info = { imgSrc: string; text: string };

function App() {
  const [infos, setInfos] = useState<info[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    // await worker.terminate();

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

  const removeInfo = (imgSrc: string) => {
    const newInfos = [...infos];
    const indexOfSrc = newInfos.findIndex((info) => info.imgSrc === imgSrc);
    newInfos.splice(indexOfSrc, 1);
    setInfos(newInfos);
  };

  useEffect(() => {
    initWorker();
    setInfos([]);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container" onPaste={handleOnPaste}>
          <header>
            <h1>Paste image and get text</h1>
          </header>
          <main className="container">
            {infos.map((info: info, idx: number) => {
              return (
                <ParstedItem
                  key={idx}
                  imgSrc={info.imgSrc}
                  text={info.text}
                  onClose={() => removeInfo(info.imgSrc)}
                />
              );
            })}

            {!Boolean(infos && infos.length) && (
              <div className="copypaste-watermark">
                <CopyIcon />
                <p>Ctrl + V</p>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
}

export default App;
