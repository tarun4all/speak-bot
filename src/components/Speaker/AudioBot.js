import { useRef, useState } from "react";
import SpeakerAnimation from "./SpeakerAnimation";
import "./speak.css";

const SILENCE_DURATION = 2000;

export default function AudioBot({ isBotSaying, onSendText }) {
  const [cc, setCc] = useState("");
  const [call, startCall] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef();
  const silenceTimerRef = useRef();
  const ccRef = useRef();

  function resetSilenceTimer() {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

    silenceTimerRef.current = setTimeout(() => {
      onSendText(ccRef.current);

      ccRef.current = "";
      setCc("");

      setIsListening(false);
    }, SILENCE_DURATION);
  }

  const start = () => {
    startCall(true);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    microphoneRef.current = new SpeechRecognition();

    microphoneRef.current.continuous = true; // Keeps listening until explicitly stopped
    microphoneRef.current.interimResults = true; // Show interim results while speaking

    microphoneRef.current.onstart = function () {
      setIsListening(true);
    };

    microphoneRef.current.onend = function () {
      setIsListening(false);
    };

    microphoneRef.current.onspeechend = function () {
      setIsListening(false);
    };

    microphoneRef.current.onresult = function (event) {
      setIsListening(true);

      let transcript = "";

      console.log(event?.results);
      if (event?.results[event.results.length - 1]?.isFinal) {
        transcript += event.results[event.results.length - 1][0].transcript;

        setCc(transcript);
        ccRef.current = (ccRef.current || "") + transcript;
      }

      resetSilenceTimer();
    };

    // Start the recognition
    microphoneRef.current.start();
    resetSilenceTimer();
  };

  return (
    <div className="audioBot">
      <SpeakerAnimation speaking={isBotSaying || isListening} />
      <div className="cc">{cc}</div>
      {!call && (
        <button onClick={start} className="call">
          Start call
        </button>
      )}
    </div>
  );
}
