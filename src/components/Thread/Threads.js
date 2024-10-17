import { useEffect, useRef } from "react";
import { Send, Receive } from "./Chat";
import "./thread.css";

export default function Threads({ loader, chats }) {
  const bottomref = useRef();

  useEffect(() => {
    if (chats.length) {
      bottomref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [chats]);

  return (
    <div className="threads">
      {chats.map((obj) => {
        if (obj.send) {
          return <Send msg={obj.msg} />;
        }

        return <Receive msg={obj.msg} />;
      })}
      {loader && <Receive msg={"Processing..."} />}
      <div className="bottomOfChat" ref={bottomref}></div>
    </div>
  );
}
