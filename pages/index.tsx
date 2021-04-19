import Head from "next/head";
import { Box, Flex, Button } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import React, { useContext } from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";
import { formatAddress } from "../utils/StringUtils";
import { SplashPage } from "../components/SplashPage";
import { CurrentAuction } from "../components/CurrentAuction";
import { Cryptolympians } from "../types";
import { useContracts } from "../hooks/useContracts";
import { ErrorState } from "../components/ErrorState";

export default function Home() {
  const { connect, address, connected, disconnect } = useContext(
    Web3ModalContext
  );
  const contract: Cryptolympians = useContracts().cryptolympians;

  const getContent = () => {
    if (!connected) {
      return <SplashPage />;
    }
    if (contract == null) {
      return <ErrorState />;
    }
    return <CurrentAuction contract={contract} />;
  };

  return (
    <Flex
      direction="column"
      w="100%"
      h="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      // backgroundColor="green"
      bgGradient={"linear(to-br, " + "#000000" + ", " + "#f28439" + ")"}
    >
      <Head>
        <title>Cryptolympians</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box position="fixed" top="2rem" right="2rem">
        <Button
          colorScheme="whiteAlpha"
          rightIcon={connected ? null : <ChevronRightIcon />}
          onClick={connected ? disconnect : connect}
        >
          {connected ? formatAddress(address) : "Connect Wallet"}
        </Button>
      </Box>

      {getContent()}
    </Flex>
  );
}
