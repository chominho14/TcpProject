import { useEffect, useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

function MessagesContainer() {
  // 방에서 온 소켓 정보들을 받는다
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const newMessageRef = useRef(null);
  const messageEndRef = useRef(null);

  function handleSendMessage() {
    const message = newMessageRef.current.value;

    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const date = new Date();

    setMessages([
      ...messages,
      {
        username: "You",
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    newMessageRef.current.value = "";
  }

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!roomId) {
    return <div />;
  }

  return (
    <div>
      <div>
        {messages.map(({ message, username, time }, index) => {
          return (
            <div key={index}>
              <div key={index}>
                <span>
                  {username} - {time}
                </span>
                <span>: {message}</span>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>
      <div>
        <textarea
          rows={1}
          placeholder="생각하고 있는 것을 말해주세요"
          ref={newMessageRef}
        />
        <button onClick={handleSendMessage}>보내기</button>
      </div>
    </div>
  );
}

export default MessagesContainer;
