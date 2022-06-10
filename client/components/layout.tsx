import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchCoins } from "../api/api";
import RealtimeChat from "./realtimeChat";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div className="fixed top-0 flex h-12 w-full max-w-xl items-center justify-center  border-b bg-white px-10 text-lg  font-medium text-gray-800">
      {hasTabBar ? (
        <nav>
          <div>
            <div>{children}</div>
            {/* <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/coins">
              <a>Coin</a>
            </Link> */}
            {/* <RealtimeChat /> */}
            <iframe
              src="coins/realtimechats"
              name="left"
              width="200"
              height="500"
            ></iframe>
            <iframe src="/coins" name="right" width="400" height="500"></iframe>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
