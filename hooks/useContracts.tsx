import { Cryptolympians__factory, Cryptolympians } from "../types";
import { useContext, useMemo } from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";

const CRYPTOLYMPIANS_ADDRESS = {
  3: "0xA53346A867f5716D8797c2f75200b881ef14B77F", // ropsten
};

export interface Contracts {
  cryptolympians: Cryptolympians | null;
}

function useContracts(): Contracts {
  const { connected, chainId, address, provider } = useContext(
    Web3ModalContext
  );
  const contracts = useMemo((): Contracts => {
    if (!connected || CRYPTOLYMPIANS_ADDRESS[chainId] == null) {
      return { cryptolympians: null };
    }
    return {
      cryptolympians: Cryptolympians__factory.connect(
        CRYPTOLYMPIANS_ADDRESS[chainId],
        provider
      ),
    };
  }, [connected, chainId, address]);
  return contracts;
}

export { useContracts };
