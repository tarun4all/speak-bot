import { useReducer, useRef, useState } from "react";
import "./videoPlayer.css";

export default function UserVisual({}) {
  const [userVisible, setUserVisible] = useState(false);
  const videoRef = useRef();

  const start = () => {
    setUserVisible(true);

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then(function (stream) {
        console.log(videoRef.current, stream);
        videoRef.current.srcObject = stream;
      })
      .catch(function (error) {
        console.error("Error accessing the camera", error);
      });
  };

  return (
    <div className="videoPlayer">
      {userVisible ? (
        <video autoPlay playsInline muted ref={videoRef}></video>
      ) : (
        <button onClick={start}>Show me</button>
      )}
    </div>
  );
}
