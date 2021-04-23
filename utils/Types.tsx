import { BigNumber } from "ethers";

export type Auction = {
  tokenID: BigNumber;
  winner: string;
  winningBid: BigNumber; // wei
  startTime: BigNumber; // seconds
  endTime: BigNumber; // seconds
};

export type TokenMetadata = {
  name: string;
  tokenURI: string;
  description: string;
  image: string;
};
