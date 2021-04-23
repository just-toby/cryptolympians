import { Text, Image, Heading, Flex, Link } from "@chakra-ui/react";
import { ethers } from "ethers";
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
        <Image src={tokenMetadata?.image} maxWidth="50%" marginBottom="4rem" />

        <Flex direction="row" width="50%" justifyContent="space-between">
          <Flex direction="column">
            <Heading as="h2" size="xl" color="white" marginBottom="1rem">
              {tokenMetadata?.name}
            </Heading>
            <Heading as="h5" size="sm" color="white" marginBottom="1rem">
              {tokenMetadata?.description}
            </Heading>
          </Flex>
          <Flex direction="column">
            <Heading as="h5" size="sm" color="white" marginBottom="1rem">
              Winning Bid
            </Heading>
            <Heading as="h2" size="xl" color="white" marginBottom="1rem">
              <Link
                isExternal={true}
                href={"https://etherscan.io/address/" + auction?.winner}
              >
                Ξ{" "}
                {ethers.utils
                  .formatEther(auction.winningBid ?? 0)
                  .substring(0, 6)}
              </Link>
            </Heading>
          </Flex>
        </Flex>
      </>
    );
  }, [auction, tokenMetadata]);

  if (props.checkLive && auction?.endTime.mul(1000).gte(now)) {
    return null;
  }

  return (
    <TileContainer
      loading={loading}
      content={getContent()}
      tileStyle={{ marginBottom: "4rem" }}
    />
  );
}
