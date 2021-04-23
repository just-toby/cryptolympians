import React, { useContext } from "react";
import PageContainer from "../components/PageContainer";
import { Web3ModalContext } from "../context/Web3ModalContext";
import { useContracts } from "../hooks/useContracts";
import { Cryptolympians } from "../types";
import {
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  Link,
} from "@chakra-ui/react";
import TileContainer from "../components/TileContainer";

export default function About() {
  const contract: Cryptolympians = useContracts().cryptolympians;

  const getContent = () => {
    return (
      <Flex direction="column">
        <Heading as="h2" size="lg" color="white">
          What is this?
        </Heading>
        <Text color="white" fontSize="xl" marginBottom="2rem" marginTop="1rem">
          I made this simple NFT series as a contribution to the community and
          culture of crypto. I want to celebrate the pioneers of crypto,
          collaboratively with everyone in the space.
          <br />
          <br />
          While that is my main goal, I would also like to generate some
          much-needed income. Any support (via bidding or sharing my renditions
          of your favorites) is appreciated!
        </Text>
        <Heading as="h2" size="lg" color="white">
          Collection Details
        </Heading>
        <UnorderedList>
          <ListItem color="white">
            <Text
              color="white"
              fontSize="xl"
              marginBottom="2rem"
              marginTop="1rem"
            >
              These tokens are an ERC721 collection and the contract can be
              found{" "}
              <Link
                isExternal={true}
                href={"https://etherscan.io/address/" + contract?.address}
              >
                here.
              </Link>
            </Text>
          </ListItem>

          <ListItem color="white">
            <Text
              color="white"
              fontSize="xl"
              marginBottom="2rem"
              marginTop="1rem"
            >
              Each token is a 1/1.
            </Text>
          </ListItem>
          <ListItem color="white">
            <Text
              color="white"
              fontSize="xl"
              marginBottom="2rem"
              marginTop="1rem"
            >
              The image shown for each auction on this site is simply a low
              quality screenshot.
            </Text>
          </ListItem>
          <ListItem color="white">
            <Text
              color="white"
              fontSize="xl"
              marginBottom="2rem"
              marginTop="1rem"
            >
              Auctions winners will be entitled to the high-quality media
              download after claiming their token. (mp4, full rotation
              animation). They will also have the option to request the media be
              served from our metadata API instead of the static image.
            </Text>
          </ListItem>
        </UnorderedList>
        <Heading as="h2" size="lg" color="white">
          Contact
        </Heading>
        <UnorderedList>
          <ListItem color="white">
            <Text
              color="white"
              fontSize="xl"
              marginBottom="2rem"
              marginTop="1rem"
            >
              <Link href="mailto:cryptolympians@protonmail.com">Via Email</Link>
            </Text>
          </ListItem>
        </UnorderedList>
      </Flex>
    );
  };

  return (
    <PageContainer
      vCenter={true}
      content={
        <TileContainer
          tileStyle={{
            maxWidth: "60rem",
          }}
          loading={false}
          content={getContent()}
        />
      }
    />
  );
}
