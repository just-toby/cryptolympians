import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

type TokenMetadata = {
  description: string;
  external_url: string;
  image: string;
  name: string;
  attributes: Array<Object>;
};

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

// API handler for cryptolympians.com/token/<tokenId>
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);

  let metadata: TokenMetadata = null;

  const { id } = req.query;

  switch (id) {
    case "0":
      metadata = {
        description: "Founder of ChainLink. Secretly Satoshi Nakamoto.",
        name: "Sergey Nazarov",
        image: "https://cryptolympians.com/sergey.mp4",
        external_url: "https://cryptolympians.com/api/token?id=0",
        attributes: [],
      };
      break;
    case "1":
      metadata = {
        description: "Founder of Uniswap. Insecure.",
        name: "Hayden Adams",
        image: "https://cryptolympians.com/hayden.mp4",
        external_url: "https://cryptolympians.com/api/token?id=1",
        attributes: [],
      };
      break;
    case "2":
      metadata = {
        description: "Founder of Binance. Rich centralization freak.",
        name: "Changpeng Zhao",
        image: "https://cryptolympians.com/cz.mp4",
        external_url: "https://cryptolympians.com/api/token?id=2",
        attributes: [],
      };
      break;
    case "3":
      metadata = {
        description:
          'Founder of Tron. Tried to buy Beeple: Everydays but accidentally chose the "slow" gas option.',
        name: "Justin Sun",
        image: "https://cryptolympians.com/sun.mp4",
        external_url: "https://cryptolympians.com/api/token?id=3",
        attributes: [],
      };
      break;
    case "4":
      metadata = {
        description: "Creator of Ethereum. Gave birth to the new world order.",
        name: "Vitalik Buterin",
        image: "https://cryptolympians.com/vitalik.mp4",
        external_url: "https://cryptolympians.com/api/token?id=4",
        attributes: [],
      };
      break;
  }

  if (metadata == null) {
    res.status(500);
  }

  res.status(200).json(metadata);
};
