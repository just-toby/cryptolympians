import { Text, Image } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useContracts } from "../hooks/useContracts";
import { useNow } from "../hooks/useNow";
import { Cryptolympians } from "../types";
import { Auction, TokenMetadata } from "../utils/Types";
import TileContainer from "./TileContainer";

export type PastAuctionTileProps = {
  index: number;
  checkLive: boolean;
};

export function PastAuctionTile(props: PastAuctionTileProps) {
  const contract: Cryptolympians = useContracts().cryptolympians;
  const [loading, setLoading] = useState<boolean>(true);
  const [auction, setAuction] = useState<Auction>(null);
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata>(null);

  const { now } = useNow();

  useEffect(() => {
    if (contract == null) {
      return;
    }
    (async () => {
      const auction = await contract.auctions(props.index);

      const token = auction.tokenID;
      const tokenURI = await contract.tokenURI(token);

      fetch(tokenURI)
        .then((response) => response.json())
        .then((data) => {
          setTokenMetadata(data);
          setAuction(auction);
          setLoading(false);
        });
    })();
  }, [contract, props.index]);

  const getContent = useCallback(() => {
    if (auction == null) {
      return null;
    }

    return (
      <>
        <Image src={tokenMetadata?.image} maxWidth="50%" />

        <Text color="white">name: {tokenMetadata.name}</Text>

        <Text color="white">winning bid: {auction.winningBid.toString()}</Text>
      </>
    );
  }, [auction, tokenMetadata]);

  if (props.checkLive && auction?.endTime.mul(1000).gte(now)) {
    return null;
  }

  return <TileContainer loading={loading} content={getContent()} />;
}
