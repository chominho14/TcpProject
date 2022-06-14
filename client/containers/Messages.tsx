import { useEffect, useRef } from "react";
import styled from "styled-components";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

// 타이틀
const ChatingTitle_h2 = styled.h2`
  text-transform: uppercase;
  text-align: center;
  font-size: 20px;
`;

// 메시지 textarea, button
const ChatingMessageContainer = styled.div`
  position: relative;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-left: 10%;
  margin-right: 10%;
`;

const ChatingMessaging = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: 100%;
  max-width: 28rem;
  align-items: center;
`;

const ChatingMessageText = styled.textarea`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: solid 2px gray;
  border-radius: 5px;
  height: 40px;
`;

const ChatingMessageButton = styled.button`
  height: 40px;
`;

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

    // 서버에서 클라이언트로 이벤트 전송(메시지)
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
      <hr />
      <ChatingTitle_h2>채팅하기</ChatingTitle_h2>
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
      <ChatingMessageContainer>
        <ChatingMessaging>
          <ChatingMessageText
            rows={1}
            placeholder="생각하고 있는 것을 말해주세요"
            ref={newMessageRef}
          />
          <ChatingMessageButton onClick={handleSendMessage}>
            보내기
          </ChatingMessageButton>
        </ChatingMessaging>
      </ChatingMessageContainer>
    </div>
  );
}

export default MessagesContainer;
