import Head from "next/head";
import Image from "next/image";
import { useSockets } from "../../context/socket.context";

import RoomsContainer from "../../containers/Rooms";
import MessagesContainer from "../../containers/Messages";
import { useEffect, useRef } from "react";

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
      usernameRef.current.value = localStorage.getItem("username") || "";
  }, []);

  return (
    <div>
      {!username && (
        <div>
          <div>
            <input placeholder="유저 이름" ref={usernameRef} />
            <button onClick={handleSetUsername}>시작하기</button>
          </div>
        </div>
      )}
      {username && (
        <div>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
    </div>
  );
}
