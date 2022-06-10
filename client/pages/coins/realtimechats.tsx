import { useSockets } from "../../context/socket.context";

import RoomsContainer from "../../containers/Rooms";
import MessagesContainer from "../../containers/Messages";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const ChatTitle = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatTitle_h1 = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-size: 30px;
`;

const ChatContainer = styled.div`
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  padding: 40px 10px;
  box-sizing: border-box;
  box-shadow: black 5px 5px 20px 0px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  height: 90vh;
`;

const NewUser = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const NewUserInput = styled.input`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 0.375rem;
  height: 30px;
`;

const NewUserButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 0.375rem;
  text-align: center;
  background-color: "#808080";
  color: gray;
  justify-content: center;
  margin-top: 5px;
  height: 30px;
`;

const OldUser = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default function RealtimeChat() {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef(null);

  function handleSetUsername() {
    const value = usernameRef.current.value;
    if (!value) {
      console.log("실패!");
      return;
    }

    setUsername(value);

    localStorage.setItem("username", value);
  }

  useEffect(() => {
    if (usernameRef)
      // 브라우저 로컬스토리지에 유저 이름을 기억해 보여준다.
      usernameRef.current.value = localStorage.getItem("username") || "";
  }, []);

  return (
    <ChatContainer>
      <ChatTitle>
        <ChatTitle_h1>채팅방</ChatTitle_h1>
      </ChatTitle>
      {!username && (
        <div>
          <NewUser>
            <NewUserInput placeholder="유저 이름" ref={usernameRef} />
            <NewUserButton onClick={handleSetUsername}>시작하기</NewUserButton>
          </NewUser>
        </div>
      )}
      {username && (
        <OldUser>
          <RoomsContainer />
          <MessagesContainer />
        </OldUser>
      )}
    </ChatContainer>
  );
}
