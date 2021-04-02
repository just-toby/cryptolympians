import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { Web3ModalConfig } from "../context/Web3ModalContext";
import { isNullOrEmpty } from "../utils/StringUtils";

const useWeb3ModalContext: () => Web3ModalConfig = () => {
  // top level state that will be passe to the app via context in _app.tsx
  const [web3Modal, setWeb3Modal] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState(0);
  const [networkId, setNetworkId] = useState(0);

  const connect = useCallback(() => {
    web3Modal.connect().then((provider) => {
      const web3: any = new Web3(provider);
      web3.eth.extend({
        methods: [
          {
            name: "chainId",
            call: "eth_chainId",
            outputFormatter: web3.utils.hexToNumber,
          },
        ],
      });
      setWeb3(web3);

      setupSubscriptions(provider);

      web3.eth.getAccounts().then((accounts) => {
        const address = accounts[0];
        setAddress(address);
      });
      web3.eth.net.getId().then((networkId) => {
        setNetworkId(networkId);
      });
      web3.eth.chainId().then((chainId) => {
        setChainId(chainId);
      });
    });
  }, [web3Modal]);

  const disconnect = () => {
    setAddress(null);
  };

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.NEXT_PUBLIC_REACT_APP_INFURA_ID,
        },
      },
    };

    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions,
    });

    setWeb3Modal(web3Modal);
  }, []);

  const setupSubscriptions = (provider) => {
    provider.on("disconnect", () => {
      window.location.href = "/";
    });
    provider.on("accountsChanged", async (accounts: string[]) => {
      setAddress(accounts[0]);
    });
    provider.on("chainChanged", async (chainId: number) => {
      const networkId = await web3.eth.net.getId();

      setChainId(chainId);
      setNetworkId(networkId);
    });

    provider.on("networkChanged", async (networkId: number) => {
      const chainId = await web3.eth.chainId();
      setChainId(chainId);
      setNetworkId(networkId);
    });
  };

  return {
    web3Modal,
    web3,
    address,
    networkId,
    chainId,
    connected: !isNullOrEmpty(address),
    connect,
    disconnect,
  };
};

export { useWeb3ModalContext };
