import React from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";

export interface Web3ModalConfig {
  web3Modal: Web3Modal;
  web3: Web3;
  address: string;
  chainId: number;
  networkId: number;
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const Web3ModalContext = React.createContext<Web3ModalConfig>({
  web3Modal: null,
  web3: null,
  address: "",
  chainId: 0,
  networkId: 0,
  connected: false,
  connect: () => {},
  disconnect: () => {},
});

export { Web3ModalContext };
