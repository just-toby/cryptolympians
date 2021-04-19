import { Heading } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import { Cryptolympians } from "../types";

export type CurrentAuctionProps = {
  contract: Cryptolympians;
};

type Auction = {
  tokenID: BigNumber;
  winner: string;
  winningBid: BigNumber;
  startTime: BigNumber;
  endTime: BigNumber;
};

export function CurrentAuction(props: CurrentAuctionProps) {
  const [currentAuction, setCurrentAuction] = useState<Auction>(null);
  const { contract } = props;

  useEffect(() => {
    (async () => {
      const currentAuctionIndex = (await contract.auctionCount()).sub(1);
      const currentAuction = await contract.auctions(currentAuctionIndex);
      const token = currentAuction.tokenID;
      const tokenURI = await contract.tokenURI(token);
      fetch(tokenURI)
        .then((response) => response.json())
        .then((data) => {
          // TODO: save and display the token metadata
          console.log(data);
          setCurrentAuction(currentAuction);
        });
    })();
  }, [contract]);

  return (
    <>
      <Heading as="h1" size="4xl" color="white">
        Current Auction
      </Heading>

      <Heading as="h2" color="white" marginTop="4rem">
        Winning Bid: {currentAuction?.winningBid.toNumber()}
      </Heading>

      <Heading as="h2" color="white" marginTop="4rem">
        Winning User: {currentAuction?.winner}
      </Heading>

      <Heading as="h2" color="white" marginTop="4rem">
        Start Time: {currentAuction?.startTime.toNumber()}
      </Heading>

      <Heading as="h2" color="white" marginTop="4rem">
        End Time: {currentAuction?.endTime.toNumber()}
      </Heading>
    </>
  );
}
