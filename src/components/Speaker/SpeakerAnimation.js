import "./speak.css";

export default function SpeakerAnimation({ speaking = false }) {
  return (
    <div className={"waveContainer"}>
      <div className={`wave ${speaking && "wave1"}`}></div>
      <div className={`wave ${speaking && "wave2"}`}></div>
      <div className={`wave ${speaking && "wave3"}`}></div>
      <div className={`wave ${speaking && "wave4"}`}></div>
      <div className={`wave ${speaking && "wave5"}`}></div>
    </div>
  );
}
