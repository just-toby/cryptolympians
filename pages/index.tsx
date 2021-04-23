import React, { useContext } from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";
import { SplashPage } from "../components/SplashPage";
import { CurrentAuction } from "../components/CurrentAuction";
import { Cryptolympians } from "../types";
import { useContracts } from "../hooks/useContracts";
import { ErrorState } from "../components/ErrorState";
import PageContainer from "../components/PageContainer";

export default function Home() {
  const { connected } = useContext(Web3ModalContext);
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

  return <PageContainer vCenter={true} content={getContent()} />;
}
