import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Link as ChakraLink } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";
import { formatAddress } from "../utils/StringUtils";
import { HeaderLink } from "./HeaderLink";

export type PageContainerProps = {
  content: React.ReactNode;
  vCenter?: boolean;
};

export default function PageContainer(props: PageContainerProps) {
  const { connected, address, connect, disconnect } = useContext(
    Web3ModalContext
  );

  const router = useRouter();

  return (
    <Flex
      direction="column"
      w="100%"
      h="100%"
      minHeight="100vh"
      alignItems="center"
      paddingTop={props.vCenter === false ? null : "10rem"}
      justifyContent={props.vCenter ? "center" : null}
      bgGradient={"linear(to-br, " + "#000000" + ", " + "#f28439" + ")"}
    >
      <Head>
        <title>Cryptolympians</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {connected ? (
        <Flex position="fixed" top="2.5rem" width="100%" marginLeft="4rem">
          <HeaderLink title="Live" href="/" />
          <HeaderLink title="History" href="/history" />
          <HeaderLink title="About" href="/about" />
        </Flex>
      ) : null}

      <Box position="fixed" top="2rem" right="2rem">
        <Button
          colorScheme="whiteAlpha"
          rightIcon={connected ? null : <ChevronRightIcon />}
          onClick={connected ? disconnect : connect}
        >
          {connected ? formatAddress(address) : "Connect Wallet"}
        </Button>
      </Box>

      {props.content}
    </Flex>
  );
}
