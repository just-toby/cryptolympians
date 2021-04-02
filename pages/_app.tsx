import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ModalConfig, Web3ModalContext } from "../context/Web3ModalContext";
import { useWeb3ModalContext } from "../hooks/useWeb3ModalContext";

function MyApp({ Component, pageProps }) {
  const config: Web3ModalConfig = useWeb3ModalContext();
  return (
    <Web3ModalContext.Provider value={config}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Web3ModalContext.Provider>
  );
}

export default MyApp;
