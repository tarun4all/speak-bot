import { useEffect, useState } from "react";
import Threads from "../../components/Thread/Threads";

import "./interview.css";
import AudioBot from "../../components/Speaker/AudioBot";
import UserVisual from "../../components/VideoPlayer/UserVisual";

export default function InterviewPage() {
  const [chats, setChats] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isBotSaying, setIsBotSaying] = useState(false);

  useEffect(() => {
    setChats([
      { msg: "Hi, i am visa comply voice caller." },
      { msg: "Hello, to continue, please press start call." },
    ]);
  }, []);

  const fakeAIProcessing = (msg) => {
    msg = msg?.toLowerCase() || "";

    if (msg.includes("hello")) {
      addMessage("Hello there, how can I help you.");
    } else if (msg.includes("apply for visa")) {
      addMessage("Sure, how many people will be travelling with you ?");
    } else if (msg.includes("people")) {
      addMessage("Thanks for the info.");
      addMessage("Can you tell me your PAN number");
    } else if (
      msg.includes("123") ||
      msg.includes("two") ||
      msg.includes("one") ||
      msg.includes("three")
    ) {
      addMessage("Fetching your PAN status. Please wait.");
      addMessage("Congratulation. you have successfully applied.");
    }
  };

  const addMessage = (msg, isUser = false) => {
    if (!msg?.trim()) return;

    setChats((c) => [...c, { send: isUser, msg }]);

    if (isUser) {
      setLoader(true);
      fakeAIProcessing(msg);
    } else {
      speak(msg);
      setLoader(false);
    }
  };

  const speak = (text) => {
    setIsBotSaying(true);
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // Set properties
    utterance.lang = "en-US"; // Set the language
    utterance.pitch = 1; // Set the pitch
    utterance.rate = 1; // Set the rate

    // Log when speech synthesis starts
    utterance.onstart = () => {
      console.log("Speech started");
    };

    // Log when speech synthesis ends
    utterance.onend = () => {
      console.log("Speech ended");
    };

    synth.speak(utterance);

    const timref = setTimeout(() => {
      setIsBotSaying(false);
      clearTimeout(timref);
    }, 200);
  };

  return (
    <div className="interview">
      <Threads loader={loader} chats={chats} />
      <AudioBot
        isBotSaying={isBotSaying}
        onSendText={(msg) => addMessage(msg, true)}
      />
      <UserVisual />
    </div>
  );
}
