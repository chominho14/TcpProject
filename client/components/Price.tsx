import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinToday } from "../api/api";

const Container = styled.div`
  display: grid;
  grid-template:
    "a a"
    "a a";
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.theme.textColor};
  border-radius: 20% / 50%;
  padding: 10px;
  margin: 20px;
  & span:nth-child(2) {
    margin-top: 10px;
    font-weight: bold;
  }
`;

interface PriceProps {
  coinId: string;
}

interface ITodayPrice {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<ITodayPrice[]>(["today", coinId], () =>
    fetchCoinToday(coinId)
  );
  const todayObjData: any = data ? data[0] : {};
  const displayKey = ["open", "close", "low", "high"];
  const displayEmoji = ["🎬", "🍻", "😱", "🤑"];
  const priceData = displayKey.map((data) => todayObjData[data]);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <Container>
            {displayKey.map((data, index) => {
              return (
                <List key={index}>
                  <span>
                    {displayEmoji[index]}
                    {data}
                  </span>
                  <span>${priceData[index].toFixed(2)}</span>
                </List>
              );
            })}
          </Container>
        </>
      )}
    </div>
  );
}

export default Price;
