import { Heading } from "@chakra-ui/react";
import React from "react";

export type ErrorStateProps = {};

export function ErrorState() {
  return (
    <>
      <Heading as="h1" size="4xl" color="white">
        Halt! There's a problem.
      </Heading>

      <Heading as="h2" color="white" marginTop="4rem">
        We couldn't find our contract. Please ensure you're connected to
        Ethereum Mainnet.
      </Heading>
    </>
  );
}
