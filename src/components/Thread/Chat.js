import "./thread.css";

export const Send = ({ msg }) => {
  return (
    <section className="send">
      <p>{msg}</p>
    </section>
  );
};

export const Receive = ({ msg }) => {
  return (
    <section className="receive">
      <p>{msg}</p>
    </section>
  );
};
