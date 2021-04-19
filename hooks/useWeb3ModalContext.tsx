import Web3Modal from "web3modal";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Web3ModalConfig } from "../context/Web3ModalContext";
import { isNullOrEmpty } from "../utils/StringUtils";
import { provider } from "web3-core";

const useWeb3ModalContext: () => Web3ModalConfig = () => {
  // top level state that will be passe to the app via context in _app.tsx
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>(null);
  const [provider, setProvider] = useState<providers.Web3Provider>(null);
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState(0);

  // next.js navigation
  const router = useRouter();

  /**
   * Callback for connecting an account.
   */
  const connect = useCallback(() => {
    web3Modal.connect().then(async (provider: provider) => {
      const ethersProvider = new providers.Web3Provider(
        provider as providers.ExternalProvider
      );
      setProvider(ethersProvider);
      const address = await ethersProvider.getSigner().getAddress();
      setAddress(address);
      const chainId = (await ethersProvider.getNetwork()).chainId;
      setChainId(chainId);
    });
  }, [web3Modal]);

  const disconnect = () => {
    web3Modal.clearCachedProvider();
    setAddress(null);
  };

  /**
   * Initialize Web3Modal on load.
   */
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
      cacheProvider: true,
      providerOptions,
    });

    setWeb3Modal(web3Modal);
  }, []);

  /**
   * Setup event listeners on any new provider.
   */
  useEffect(() => {
    if (provider == null) {
      return;
    }
    provider.on("disconnect", () => {});
    provider.on("accountsChanged", async (accounts: string[]) => {
      console.log({ accounts });
      setAddress(accounts[0]);
    });
    // TODO: debug this, it's not triggering correctly.
    provider.on("network", (newNetwork, oldNetwork) => {
      console.log("network changed");
      if (oldNetwork != null) {
        router.reload();
      }
    });
  }, [provider]);

  return {
    web3Modal,
    provider,
    address,
    chainId,
    connected: !isNullOrEmpty(address),
    connect,
    disconnect,
  };
};

export { useWeb3ModalContext };
