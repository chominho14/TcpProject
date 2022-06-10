import { useQuery } from "react-query";
import { fetchCoinHistory } from "../../../api/api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../../../utils/atoms";
import { useRecoilValue } from "recoil";

interface IHistorycal {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorycal[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => price.close),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },

            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            yaxis: {
              labels: {
                formatter: function (val) {
                  return val.toFixed(2);
                },
              },
            },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            colors: ["#665C5E"],
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#A09698"], stops: [0, 100] },
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
