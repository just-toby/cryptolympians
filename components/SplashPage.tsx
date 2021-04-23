import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React, { useContext } from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";
import { formatAddress } from "../utils/StringUtils";

export type SplashPageProps = {
  message: string;
};

export function SplashPage(props: SplashPageProps) {
  return (
    <>
      <Heading as="h1" size="4xl" color="white">
        ⚡ Cryptolympians ⚡
      </Heading>

      <Heading as="h2" color="white" marginTop="4rem">
        {props.message}
      </Heading>
    </>
  );
}
