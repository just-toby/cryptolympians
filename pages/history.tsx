import React, { useContext } from "react";
import PageContainer from "../components/PageContainer";
import { Web3ModalContext } from "../context/Web3ModalContext";
import { useContracts } from "../hooks/useContracts";
import { Cryptolympians } from "../types";
import { Text } from "@chakra-ui/react";

export default function History() {
  const { connect, address, connected, disconnect } = useContext(
    Web3ModalContext
  );
  const contract: Cryptolympians = useContracts().cryptolympians;

  const getContent = () => {
    return <Text color="white">Not implemented yet!</Text>;
  };

  return <PageContainer content={getContent()} />;
}
