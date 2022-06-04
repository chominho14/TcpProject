import Link from "next/link";

interface CoinProps {
  coinId: number;
}

export default function Coin({ coinId }: CoinProps) {
  return (
    <Link href={`/coins/${coinId}`}>
      <a className="flex w-full cursor-pointer justify-between px-4 pt-5"></a>
    </Link>
  );
}
