import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import EVENTS from "../config/events";

// 소켓, 유저이름, 메시지, 방 아이디, 방들의 객체 타입을 선언해 준다.
interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: { message: string; time: string; username: string }[];
  setMessages: Function;
  roomId?: string;
  rooms: object;
}

// 소켓 URL로 설정해둔 4000으로 연결
const socket = io(SOCKET_URL);

// 소켓, 방들과 메시지들 랜더링 되는 유저이름, 메시지들을 생성한다.
const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: [],
});

// 소켓 통신시 받는 메시지들을 작업해 준다.
function SocketsProvider(props: any) {
  /* 
    리액트 useState훅을 이용하여 유저이름, 방, 메시지들, 방 객체의 변화에
    따른 리랜더링이 될 수 있도록 만들어 준다.
    */
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    window.onfocus = function () {
      document.title = "201744059_조민호";
    };
  }, []);

  // 방 객체에 대한 정보를 받는다.
  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });

  // 들어간 방에 대한 정보를 받는다.
  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);

    setMessages([]);
  });

  useEffect(() => {
    // 새로 생성된 메시지들을 리랜더링해서 받는다.
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = "New message...";
      }

      setMessages((messages) => [...messages, { message, username, time }]);
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
