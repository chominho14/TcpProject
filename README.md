# socketio를 이용한 프로젝트

---

## 개발 환경

- language : TypeScript

- Franmework : NextJS

- Front-end : ReactJS, Styled-components

- Back-end : Express, Socket.io

---

### 프로젝트 설명

- 코인의 정보를 보면서 실시간으로 메시지를 나눌 수 있는 웹 사이트

---

### 기본 구조

- Express를 이용해 서버를 만들고 CORS(Cross-Origin Resource Sharing)를 이용하여 3000포트에 작업된 클라이언트와 서버를 연결시켜 준다.

- server/src/app.ts 에서 서버를 만들어 주었고, CORS 작업을 진행하였다.

- coin의 정보들을 보면서 접속해 있는 클아이언트들끼리 메시지를 주고 받을 수 있도록 구현한다.

---

### 결과 화면

- 두 클라이언트가 접속하여 채팅방을 만들고 같은 채팅방에 들어가서 대활르 나눌 수 있게 구현하였다.
  <img width="700" height="450" src="https://github.com/chominho14/TcpProject/blob/main/resultscreenshot/10.png"></img>
