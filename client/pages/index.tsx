import { NextPage } from "next";
import styled, { createGlobalStyle } from "styled-components";

const HomeDesign = styled.div`
  display: flex;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100vh;
`;

const HomeDesign_Iframe_Chat = styled.iframe`
  width: 35%;
`;

const HomeDesign_Iframe_Coin = styled.iframe`
  width: 65%;
`;

const Home: NextPage = () => {
  return (
    <HomeDesign>
      <HomeDesign_Iframe_Chat src="coins/realtimechats"></HomeDesign_Iframe_Chat>
      <HomeDesign_Iframe_Coin src="/coins"></HomeDesign_Iframe_Coin>
    </HomeDesign>
  );
};

export default Home;
