import './App.css';

import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';

import { ReactComponent as CopyIcon } from './assets/icons/copy.svg';
import Loading from './components/Loading';
import ParstedItem from './components/PastedContainer';
import useKeyPress from './utils/useKeyPress';

function App() {
  type info = { imgSrc: string; text: string };

  const delayToApreciateKeysAnimation = 300;

  const [infos, setInfos] = useState<info[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [worker, setWorker] = useState(createWorker());
  const controlPress = useKeyPress("Control");
  const vPress = useKeyPress("v");

  const showWaterMark = !Boolean(infos && infos.length);

  const handleOnPaste = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const clipboardData = event.clipboardData;

    if (clipboardData.items && clipboardData.items[0]?.getAsFile()) {
      console.log("Test II");
      let file = event.clipboardData.items[0].getAsFile();
      let objectUrl = URL.createObjectURL(file);

      setTimeout(() => {
        console.log("Test", clipboardData.items);
        setInfos([...infos, { imgSrc: objectUrl, text: "Loading..." }]);
        doOCR(objectUrl);
      }, delayToApreciateKeysAnimation);
    }
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
            {showWaterMark ? (
              <div className="paste-watermark-container">
                <CopyIcon />
                <p>
                  <span className={`key ${controlPress ? "pressed-key" : ""}`}>Ctrl</span>
                  <span> + </span>
                  <span className={`key ${vPress ? "pressed-key" : ""}`}>V</span>
                </p>
              </div>
            ) : (
              <div className="pasted-items-container">
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
              </div>
            )}
          </main>

          {/* <footer>
            <div>
              Icons made by{" "}
              <a href="https://www.freepik.com" title="Freepik">
                Freepik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
          </footer> */}
        </div>
      )}
    </>
  );
}

export default App;
