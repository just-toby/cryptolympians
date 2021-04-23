import React, { useCallback, useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import { useContracts } from "../hooks/useContracts";
import { Cryptolympians } from "../types";
import { PastAuctionTile } from "../components/PastAuctionTile";
import { Heading } from "@chakra-ui/react";

export default function History() {
  const contract: Cryptolympians = useContracts().cryptolympians;
  const [auctionCount, setAuctionCount] = useState(0);

  useEffect(() => {
    if (contract == null) {
      return;
    }
    (async () => {
      const auctionCount = await contract.auctionCount();
      setAuctionCount(auctionCount.toNumber());
    })();
  }, [contract]);

  const getContent = useCallback(() => {
    if (auctionCount === 0) {
      return null;
    }
    return (
      <>
        <Heading as="h1" size="xl" color="white" marginBottom="4rem">
          Completed Auctions
        </Heading>
        {Array(auctionCount)
          .fill(0)
          .map((v, i) => i)
          .map((index) => {
            return (
              <PastAuctionTile
                index={index}
                checkLive={index === auctionCount - 1}
              />
            );
          })}
      </>
    );
  }, [auctionCount]);

  return <PageContainer content={getContent()} vCenter={false} />;
}
