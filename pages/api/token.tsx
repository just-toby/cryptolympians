import type { NextApiRequest, NextApiResponse } from "next";

type TokenMetadata = {
  description: string;
  external_url: string;
  image: string;
  name: string;
  attributes: Array<Object>;
};

// API handler for cryptolympians.com/token/<tokenId>
export default (req: NextApiRequest, res: NextApiResponse) => {
  let metadata: TokenMetadata = null;

  const { id } = req.query;

  switch (id) {
    case "0":
      metadata = {
        description: "Founder of ChainLink. Secretly Satoshi Nakamoto.",
        name: "Sergey Nazarov",
        image: "https://cryptolympians.com/sergey.mp4",
        external_url: "https://cryptolympians.com/token/0",
        attributes: [],
      };
      break;
    case "1":
      metadata = {
        description: "Founder of Uniswap. Insecure.",
        name: "Hayden Adams",
        image: "https://cryptolympians.com/hayden.mp4",
        external_url: "https://cryptolympians.com/token/1",
        attributes: [],
      };
      break;
    case "2":
      metadata = {
        description: "Founder of Binance. Rich centralization freak.",
        name: "Changpeng Zhao",
        image: "https://cryptolympians.com/cz.mp4",
        external_url: "https://cryptolympians.com/token/2",
        attributes: [],
      };
      break;
    case "3":
      metadata = {
        description:
          'Founder of Tron. Tried to buy Beeple: Everydays but accidentally chose the "slow" gas option.',
        name: "Justin Sun",
        image: "https://cryptolympians.com/sun.mp4",
        external_url: "https://cryptolympians.com/token/3",
        attributes: [],
      };
      break;
    case "4":
      metadata = {
        description: "Creator of Ethereum. Gave birth to the new world order.",
        name: "Vitalik Buterin",
        image: "https://cryptolympians.com/vitalik.mp4",
        external_url: "https://cryptolympians.com/token/4",
        attributes: [],
      };
      break;
  }

  if (metadata == null) {
    res.status(500);
  }

  res.status(200).json(metadata);
};
