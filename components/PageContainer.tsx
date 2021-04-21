import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Link as ChakraLink } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";
import { formatAddress } from "../utils/StringUtils";

export type PageContainerProps = {
  content: React.ReactNode;
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
      justifyContent="center"
      bgGradient={"linear(to-br, " + "#000000" + ", " + "#f28439" + ")"}
    >
      <Head>
        <title>Cryptolympians</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex position="fixed" top="2.5rem" width="100%" justifyContent="center">
        <Link href="/" passHref>
          <ChakraLink
            href="/"
            color="white"
            fontSize="lg"
            marginRight="4rem"
            textDecoration={router.pathname === "/" ? "underline" : null}
          >
            Live
          </ChakraLink>
        </Link>
        <Link href="/history" passHref>
          <ChakraLink
            href="/history"
            color="white"
            fontSize="lg"
            textDecoration={router.pathname === "/history" ? "underline" : null}
          >
            History
          </ChakraLink>
        </Link>
      </Flex>

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
