import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../utils/atoms";
import CoinView from "./coinview";

function Coins() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ReactQueryDevtools initialIsOpen={true} />
      <CoinView />
    </>
  );
}

export default Coins;
