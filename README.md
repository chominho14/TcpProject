# socketio를 이용한 프로젝트

---

## 개발 환경

- language : TypeScript

- Franmework : NextJS

- Front-end : ReactJS, Styled-components

- Back-end : Express, Socket.io

---

#### 코인의 정보를 보면서 실시간으로 메시지를 나눌 수 있는 웹 사이트

### 기본 구조

- Express를 이용해 서버를 만들고 CORS(Cross-Origin Resource Sharing)를 이용하여 3000포트에 작업된 클라이언트와 서버를 연결시켜 준다.

- server/src/app.ts 에서 서버를 만들어 주었고, CORS 작업을 진행하였다.

---

### 현재 error 사항

- 페이지가 바뀌는 과정에서 socket통신을 하고 있던 것이 새로고침이 되면서 화면이 초기화 된다.

### 해결 방법 구상

- html의 iframe 태그를 화룡ㅇ하여 socket 통신하는 부분을 첫 페이지로 두고 나머지 페이지들을 랜더링할 공간을 따로 두는 것이 현재 생각하고 있는 방법이다.
