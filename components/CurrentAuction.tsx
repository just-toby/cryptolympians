import {
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Link,
  Image,
  Spinner,
  Text,
  UnorderedList,
  ListItem,
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
import { Auction } from "../utils/Types";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { SplashPage } from "./SplashPage";
import { useNow } from "../hooks/useNow";

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
  const [showBidHistory, setShowBidHistory] = useState<boolean>(true);
  const [pastBids, setPastBids] = useState([]);
  const [isLive, setIsLive] = useState<boolean>(false);

  const { provider } = useContext(Web3ModalContext);
  const { now } = useNow();

  useEffect(() => {
    (async () => {
      const currentAuctionIndex = (await contract.auctionCount()).sub(1);
      if (currentAuctionIndex.lt(0)) {
        setCurrentAuctionIndex(currentAuctionIndex.toNumber());
        return;
      }
      const currentAuction = await contract.auctions(currentAuctionIndex);
      const token = currentAuction.tokenID;
      const tokenURI = await contract.tokenURI(token);
      const bidEvents = await contract.queryFilter(
        contract.filters.Bid(null, null, currentAuctionIndex)
      );
      fetch(tokenURI)
        .then((response) => response.json())
        .then((data) => {
          setMetadata(data);
          setCurrentAuction(currentAuction);
          setCurrentAuctionIndex(currentAuctionIndex.toNumber());
          setLoading(false);
          setCurrentWinningBid(currentAuction?.winningBid);
          setCurrentWinner(currentAuction?.winner);
          setPastBids(bidEvents);
        });
    })();
  }, [contract]);

  useEffect(() => {
    if (currentAuction == null) {
      return;
    }
    setIsLive(currentAuction.startTime.mul(1000).lte(now));
  }, [currentAuction, now]);

  if (currentAuctionIndex < 0) {
    return (
      <SplashPage message="There is no live auction right now. Check the history page for past auctions!" />
    );
  }

  return (
    <TileContainer
      loading={loading}
      content={
        <>
          {metadata == null ? null : (
            <>
              {/* TODO: use this if tokenMetadata.isVideo */}
              {/* <ReactPlayer playing={true} loop={true} url={metadata?.image} /> */}
              <Image src={metadata?.image} maxWidth="50%" />
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
              {currentWinner === contract?.address ? null : (
                <Heading as="h4" size="md" color="white">
                  by{" "}
                  <Link
                    isExternal={true}
                    href={
                      "https://etherscan.io/address/" + currentAuction?.winner
                    }
                  >
                    {formatAddress(currentWinner)}
                  </Link>
                </Heading>
              )}
            </Flex>
            <Flex direction="column" grow={1}>
              <Countdown
                startTimeMs={currentAuction?.startTime.mul(1000).toNumber()}
                endTimeMs={currentAuction?.endTime.mul(1000).toNumber()}
              />
            </Flex>
          </Flex>
          {isLive ? (
            <Divider color="white" marginTop="2rem" marginBottom="2rem" />
          ) : null}
          {isLive ? (
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
                        tx.wait().then(
                          async (confirmation: ContractReceipt) => {
                            setPendingBid(false);
                            setCurrentWinningBid(bidWei);
                            const sendingAddress = await provider
                              .getSigner()
                              .getAddress();
                            setCurrentWinner(sendingAddress);
                            setDraftBid("");
                          }
                        );
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
          ) : null}
          {isLive ? (
            <Divider color="white" marginTop="2rem" marginBottom="2rem" />
          ) : null}
          {isLive ? (
            <Flex direction="column">
              <Flex
                direction="row"
                flexGrow={1}
                justifyContent="center"
                alignItems="center"
              >
                <Heading as="h4" size="md" color="white" marginBottom="2rem">
                  Bid History{" "}
                  {showBidHistory ? (
                    <ArrowUpIcon
                      color="white"
                      onClick={() => {
                        setShowBidHistory(false);
                      }}
                    />
                  ) : (
                    <ArrowDownIcon
                      color="white"
                      onClick={() => {
                        setShowBidHistory(true);
                      }}
                    />
                  )}
                </Heading>
              </Flex>
              <UnorderedList>
                {showBidHistory
                  ? pastBids.map((bidData, index) => {
                      return (
                        <ListItem color="white">
                          <Text key={index} color="white">
                            Ξ {ethers.utils.formatEther(bidData.args[1])} by{" "}
                            {formatAddress(bidData.args[0])}
                          </Text>
                        </ListItem>
                      );
                    })
                  : null}
              </UnorderedList>
            </Flex>
          ) : null}
        </>
      }
    />
  );
}
