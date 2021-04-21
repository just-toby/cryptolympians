import { Divider, Flex, Heading, Link, Spacer, Text } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import { Cryptolympians } from "../types";
import ReactPlayer from "react-player";
import { formatAddress } from "../utils/StringUtils";
import { Countdown } from "./Countdown";

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

export function CurrentAuction({ contract }: CurrentAuctionProps) {
  const [currentAuction, setCurrentAuction] = useState<Auction>(null);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    (async () => {
      const currentAuctionIndex = (await contract.auctionCount()).sub(1);
      const currentAuction = await contract.auctions(currentAuctionIndex);
      const token = currentAuction.tokenID;
      const tokenURI = await contract.tokenURI(token);
      fetch(tokenURI)
        .then((response) => response.json())
        .then((data) => {
          setMetadata(data);
          setCurrentAuction(currentAuction);
        });
    })();
  }, [contract]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#1b191b"
      borderRadius="2rem"
      padding="4rem"
      boxShadow="dark-lg"
    >
      {metadata == null ? null : (
        <>
          <ReactPlayer playing={true} loop={true} url={metadata?.image} />
          <Heading as="h1" color="white" marginTop="4rem" fontFamily="serif">
            {metadata.name}
          </Heading>
          <Text color="white" marginTop="2rem" fontFamily="mono">
            {metadata.description}
          </Text>
          <Divider color="white" marginTop="4rem" />
        </>
      )}

      <Flex direction="row" marginTop="4rem" width="100%">
        <Flex direction="column" grow={1} marginRight="4rem">
          <Heading as="h5" size="sm" color="white" marginBottom="1rem">
            Current Bid
          </Heading>
          {/* TODO: translate price to ETH! */}
          <Heading as="h2" size="xl" color="white" marginBottom="1rem">
            Ξ {currentAuction?.winningBid.toNumber()}
          </Heading>
          <Heading as="h4" size="md" color="white">
            by{" "}
            <Link
              isExternal={true}
              href={"https://etherscan.io/address/" + currentAuction?.winner}
            >
              {formatAddress(currentAuction?.winner)}
            </Link>
          </Heading>
        </Flex>
        <Flex direction="column" grow={1}>
          <Countdown
            startTimeMs={currentAuction?.startTime.mul(1000).toNumber()}
            endTimeMs={currentAuction?.endTime.mul(1000).toNumber()}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
