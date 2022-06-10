import "../styles/globals.css";
import SocketsProvider from "../context/socket.context";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SocketsProvider>
          <Component {...pageProps} />
        </SocketsProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
