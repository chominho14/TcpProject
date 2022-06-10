const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export async function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 6;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}

export function fetchCoinToday(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/today`).then((response) =>
    response.json()
  );
}

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
