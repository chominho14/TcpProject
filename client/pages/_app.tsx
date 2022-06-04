import "../styles/globals.css";
import SocketsProvider from "../context/socket.context";
import { useQuery, QueryClientProvider, QueryClient } from "react-query";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <SocketsProvider>
            <Component {...pageProps} />
          </SocketsProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </RecoilRoot>
  );
}

export default MyApp;
