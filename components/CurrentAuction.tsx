import {
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Link,
  Skeleton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
  ethers,
} from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { Cryptolympians } from "../types";
import ReactPlayer from "react-player";
import { formatAddress, isNullOrEmpty } from "../utils/StringUtils";
import { Countdown } from "./Countdown";
import { Web3ModalContext } from "../context/Web3ModalContext";
import TileContainer from "./TileContainer";
import Image from "next/image";
import { Auction } from "../utils/Types";

export type CurrentAuctionProps = {
  contract: Cryptolympians;
};

export function CurrentAuction({ contract }: CurrentAuctionProps) {
  const [currentAuction, setCurrentAuction] = useState<Auction>(null);
  const [currentAuctionIndex, setCurrentAuctionIndex] = useState<number>(0);
  const [metadata, setMetadata] = useState(null);
  const [draftBid, setDraftBid] = useState<string>("");
  const [pendingBid, setPendingBid] = useState<boolean>(false);
  const [currentWinningBid, setCurrentWinningBid] = useState<BigNumberish>(0);
  const [currentWinner, setCurrentWinner] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { provider } = useContext(Web3ModalContext);

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
          setCurrentAuctionIndex(currentAuctionIndex.toNumber());
          setLoading(false);
          setCurrentWinningBid(currentAuction?.winningBid);
          setCurrentWinner(currentAuction?.winner);
        });
    })();
  }, [contract]);

  return (
    <TileContainer
      loading={loading}
      content={
        <>
          {metadata == null ? null : (
            <>
              {/* TODO: use this if tokenMetadata.isVideo */}
              {/* <ReactPlayer playing={true} loop={true} url={metadata?.image} /> */}
              <Image src={metadata?.image} width="8rem" height="6rem" />
              <Heading
                as="h1"
                color="white"
                marginTop="4rem"
                fontFamily="serif"
              >
                {metadata?.name}
              </Heading>
              <Text color="white" marginTop="2rem" fontFamily="mono">
                {metadata?.description}
              </Text>
              <Divider color="white" marginTop="4rem" />
            </>
          )}

          <Flex direction="row" marginTop="4rem" width="100%">
            <Flex direction="column" grow={1} marginRight="4rem">
              <Heading as="h5" size="sm" color="white" marginBottom="1rem">
                Current Bid
              </Heading>
              <Heading as="h2" size="xl" color="white" marginBottom="1rem">
                Ξ{" "}
                {ethers.utils
                  .formatEther(currentWinningBid ?? 0)
                  .substring(0, 6)}
              </Heading>
              <Heading as="h4" size="md" color="white">
                by{" "}
                <Link
                  isExternal={true}
                  href={
                    "https://etherscan.io/address/" + currentAuction?.winner
                  }
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
          <Divider color="white" marginTop="2rem" marginBottom="2rem" />
          <Flex direction="row" justifyContent="center" alignItems="center">
            <Input
              value={draftBid}
              marginRight="2rem"
              color="white"
              placeholder="Enter bid amount (in ETH)"
              onChange={(event) => setDraftBid(event.target.value)}
              disabled={pendingBid}
            />
            {pendingBid ? (
              <Spinner size="md" color="yellow" />
            ) : (
              <Button
                disabled={isNullOrEmpty(draftBid)}
                onClick={() => {
                  if (isNullOrEmpty(draftBid)) {
                    return;
                  }
                  setPendingBid(true);
                  const bidWei = ethers.utils.parseEther(draftBid);
                  contract
                    .connect(provider.getSigner())
                    .placeBid(currentAuctionIndex, {
                      value: bidWei,
                    })
                    .then((tx: ContractTransaction) => {
                      tx.wait().then(async (confirmation: ContractReceipt) => {
                        setPendingBid(false);
                        setCurrentWinningBid(bidWei);
                        const sendingAddress = await provider
                          .getSigner()
                          .getAddress();
                        setCurrentWinner(sendingAddress);
                        setDraftBid("");
                      });
                    })
                    .catch((e) => {
                      setPendingBid(false);
                    });
                }}
                colorScheme="whiteAlpha"
                size="lg"
              >
                {" "}
                Place Bid{" "}
              </Button>
            )}
          </Flex>
        </>
      }
    />
  );
}
