import { useQuery } from "react-query";
import styled from "styled-components";
import Coin from "../../components/coin";
import { handleFetchAllCoins, handleFetchAllTickers } from "../../api/api";
import { useCallback, useEffect, useState } from "react";

interface AllCoinsInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface AllTickersInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Container = styled.div`
  border-radius: 10px;
  max-width: 480px;
  width: 480px;
  padding: 40px 10px;
  box-sizing: border-box;
  box-shadow: black 5px 5px 20px 0px;
  margin: 100px 0;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const Header = styled.header`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-size: 30px;
`;

const CoinUl = styled.ul`
  padding: 20px;
`;

const CoinNav = styled.div`
  display: flex;
  span {
    color: ${(props) => props.theme.textColor};
    text-transform: uppercase;
    font-size: 14px;
  }
  span:nth-child(1) {
    flex: 1;
  }
  span:nth-child(2) {
    flex: 2.5;
  }
  span:nth-child(3) {
    flex: 1.5;
    text-align: right;
  }
`;

const CoinView = () => {
  const [page, setPage] = useState<number>(1);
  const [allData, setAllData] = useState<AllTickersInterface[]>([]);
  const { isLoading: allCoinsLoading, data: allCoinsData } = useQuery<
    AllCoinsInterface[]
  >("allCoins", handleFetchAllCoins);
  const {
    isLoading: allTickersLoading,
    data: allTickersData,
    refetch,
  } = useQuery<AllTickersInterface[]>("allTickers", () =>
    handleFetchAllTickers(page)
  );

  const handleInfiniteScroll = useCallback(async () => {
    const offsetHeight: number = document.documentElement.offsetHeight;
    const innerHeight: number = window.innerHeight;
    const scrollTop: number = document.documentElement.scrollTop;

    if (offsetHeight === innerHeight + scrollTop) {
      setPage((page: number) => page + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [handleInfiniteScroll]);

  useEffect(() => {
    if (allTickersData) {
      setAllData((allData: AllTickersInterface[]) => {
        const result: AllTickersInterface[] = [...allData, ...allTickersData];
        return result;
      });
    }
  }, [allTickersData]);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <Container>
      <Header>
        <Title>코인 정보</Title>
      </Header>
      {(allCoinsLoading || allTickersLoading) === true ? null : (
        <CoinUl>
          <CoinNav>
            <span>Rank</span>
            <span>Volume / Change</span>
            <span>Price / Change</span>
          </CoinNav>
          {allData?.map((coin: AllTickersInterface, index: number) => (
            <Coin
              key={coin.id + index}
              id={coin.id}
              rank={coin.rank}
              symbol={coin.symbol}
              name={coin.name}
              price={coin.quotes.USD.price}
              priceChange={coin.quotes.USD.percent_change_24h}
              volume={coin.quotes.USD.volume_24h}
              volumeChange={coin.quotes.USD.volume_24h_change_24h}
              image={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
            />
          ))}
        </CoinUl>
      )}
    </Container>
  );
};

export default CoinView;
