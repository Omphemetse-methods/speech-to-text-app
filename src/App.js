import React, { useState, useRef } from "react";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.css";
import PopUp from "./components/PopUp";

const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(
  process.env.REACT_APP_SPEECH_RECOGNTION_API_KEY
);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Dictaphone = () => {
  const [message, setMessage] = useState("");
  const commands = [
    {
      command: "reset",
      callback: () => resetTranscript(),
    },
    {
      command: "shut up",
      callback: () => setMessage("I wasn\t talking"),
    },
    {
      command: "Hello",
      callback: () => setMessage("Hi there"),
    },
  ];

  const {
    transcript,
    resetTranscript,
    interimTranscipt,
    finalTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  const textRef = useRef();
  const [isCopied, setIsCopied] = useState(false);

  function handleTextSelection() {
    navigator.clipboard.writeText(transcript);
    setIsCopied(true);
  }

  function handleClose() {
    setIsCopied(false);
  }

  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-GB",
    });
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="min-w-screen min-h-screen bg-gray-100">
      <section className="flex flex-col items-center justify-center space-y-2">
        <p className="text-6xl text-gray-600 font-sans pt-12">
          Speech Recognition
        </p>
        <p>Turn speech to text.</p>

        <div className="row examples pt-4">
          <div className="col-3">
            <div className="snippet">
              <div className="stage flex space-x-4 items-center">
                <div className="dot-elastic"></div>
                <div className="dot-elastic"></div>
                <div className="dot-elastic"></div>
              </div>
            </div>
          </div>
        </div>

        <>
          <div className="row">
            <div className="spinner spinner-bounce-top"></div>
          </div>
        </>
      </section>

      <section className="flex justify-center items-center">
        <section className="w-8/12 p-8 space-y-8">
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="px-10 py-3 shadow border-2 border-blue-300 bg-blue-100"
              onClick={resetTranscript}
            >
              Reset
            </button>
            <button
              type="button"
              className="px-10 py-3 border-2 border-green-300 shadow bg-green-100"
              onClick={listenContinuously}
            >
              Listen
            </button>
            <button
              type="button"
              className="px-10 py-3 border-2 border-red-300 shadow bg-red-100"
              onClick={SpeechRecognition.stopListening}
            >
              Stop
            </button>
          </div>
          <div className="space-y-12 p-8 bg-white shadow-sm border-2 border-green-50">
            <section className="flex justify-end">
              <button
                className="shadow-md border-2 border-purple-400 px-12 py-4"
                onClick={handleTextSelection}
              >
                Copy Text
              </button>
            </section>
            <p ref={textRef}>{transcript}</p>

            <section className="p-8 flex items-center space-x-4">
              <p>{message}</p>
            </section>
          </div>
        </section>
      </section>

      <PopUp isCopied={isCopied} handleClose={handleClose}></PopUp>
    </div>
  );
};
export default Dictaphone;
