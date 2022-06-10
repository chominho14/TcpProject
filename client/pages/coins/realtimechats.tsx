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
      // 브라우저 로컬스토리지에 유저 이름을 기억해 보여준다.
      usernameRef.current.value = localStorage.getItem("username") || "";
  }, []);

  return (
    <div className="mx-auto w-full max-w-xl">
      {!username && (
        <div>
          <div>
            <input placeholder="유저 이름" ref={usernameRef} />
            <button onClick={handleSetUsername}>시작하기</button>
          </div>
        </div>
      )}
      {username && (
        <div className="mx-auto w-full max-w-xl">
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
    </div>
  );
}
