import { providers } from "ethers";
import React from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";

export interface Web3ModalConfig {
  web3Modal: Web3Modal;
  provider: providers.Web3Provider;
  address: string;
  chainId: number;
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const Web3ModalContext = React.createContext<Web3ModalConfig>({
  web3Modal: null,
  provider: null,
  address: "",
  chainId: 0,
  connected: false,
  connect: () => {},
  disconnect: () => {},
});

export { Web3ModalContext };
