import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

// 이벤트들을 모아둔 객체
const EVENTS = {
  // 사용자가 웹사이트에 접속하면 자동으로 발생하는 이벤트
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};

const rooms: Record<string, { name: string }> = {};

// 서버에서 클라이언트로 이벤트를 전달하는 코드 구현
// io.emit 은 클라이언트에게 이벤트를 전달하는 역할을 한다.
function socket({ io }: { io: Server }) {
  logger.info(`Sockets enabled`);

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);

    socket.emit(EVENTS.SERVER.ROOMS, rooms);

    /*
     * 유저가 새로운 방을 만들었을 때 코드
     */
    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      console.log({ roomName });
      // roomId 생성
      const roomId = nanoid();
      // 방의 객체에 새 방을 추가
      rooms[roomId] = {
        name: roomName,
      };
      // 방에 입장
      socket.join(roomId);

      // 새 방이 있다면 rooms를 전달
      // broadcast 는 sender socket을 제외하고 전달함
      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

      // 모든 방 생성자에게 전달
      socket.emit(EVENTS.SERVER.ROOMS, rooms);
      // 방 생성자가 방에 참여했다고 전달
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });

    /*
     * 유저가 방에서 메시지를 보낼때 코드
     */

    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ roomId, message, username }) => {
        const date = new Date();

        // 같은 rooId인 클라이언트에 전달한다.
        socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
          message,
          username,
          time: `${date.getHours()}:${date.getMinutes()}`,
        });
      }
    );

    /*
     * 유저가 방에 들어왔을 때 전달하는 코드
     */
    socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
      socket.join(roomId);

      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });
  });
}

export default socket;
