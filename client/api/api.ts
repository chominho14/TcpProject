const BASE_URL = `https://api.coinpaprika.com/v1`;

export const handleFetchAllTickers = async (page: number): Promise<never[]> => {
  const allTickers: [] = await (
    await fetch(`https://api.coinpaprika.com/v1/tickers?page=${page}`)
  ).json();
  const slicedAllTickers: never[] = allTickers?.slice(0, 100);
  return slicedAllTickers;
};

export const handleFetchAllCoins = async (): Promise<never[]> => {
  const allCoins: [] = await (
    await fetch(`https://api.coinpaprika.com/v1/coins`)
  ).json();
  const slicedAllCoins: never[] = allCoins?.slice(0, 100);
  return slicedAllCoins;
};
