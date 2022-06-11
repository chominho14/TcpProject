import { useRef } from "react";
import styled from "styled-components";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

const RoomContainer = styled.nav`
  max-width: 400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  height: 40vh;
`;

const RoomCreate = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding-bottom: 5px;
`;

const RoomCreateInput = styled.input`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 0.375rem;
  height: 30px;
`;

const RoomCreateButton = styled.button`
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
  cursor: pointer;
  &:hover {
    background-color: gray;
    color: white;
  }
`;

const RoomEntranceTitle_h2 = styled.h2`
  text-transform: uppercase;
  text-align: center;
  font-size: 20px;
`;

const RoomList_ul = styled.ul`
  padding-right: 40px;
`;

const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const RoomListEnctranceButton = styled.button`
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
  cursor: pointer;
  &:hover {
    background-color: gray;
    color: white;
  }
`;

function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef(null);

  function handleCreateRoom() {
    //get the room name
    const roomName = newRoomRef.current.value || "";

    if (!String(roomName).trim()) return;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name input to empty string
    newRoomRef.current.value = "";
  }

  function handleJoinRoom(key) {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <RoomContainer>
      <RoomCreate>
        <RoomCreateInput ref={newRoomRef} placeholder="방 이름" />
        <RoomCreateButton className="cta" onClick={handleCreateRoom}>
          방 생성하기
        </RoomCreateButton>
      </RoomCreate>
      <hr />
      <div>
        <RoomEntranceTitle_h2>채팅방 들어가기</RoomEntranceTitle_h2>
      </div>
      <RoomList_ul>
        {Object.keys(rooms).map((key) => {
          return (
            <RoomList key={key}>
              <RoomListEnctranceButton
                disabled={key === roomId}
                title={`${rooms[key].name} 들어가기`}
                onClick={() => handleJoinRoom(key)}
              >
                {rooms[key].name}에 입장하기
              </RoomListEnctranceButton>
            </RoomList>
          );
        })}
      </RoomList_ul>
    </RoomContainer>
  );
}

export default RoomsContainer;
