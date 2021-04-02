import Head from "next/head";
import { Heading, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function Home() {
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

      <Heading as="h1" size="4xl" color="white">
        ⚡ Cryptolympians ⚡
      </Heading>

      <Heading as="h2" color="white" marginTop="4rem">
        Pay tribute to your gods. Coming soon.
      </Heading>
    </Flex>
  );
}
