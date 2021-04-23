import { Flex, Skeleton } from "@chakra-ui/react";
import React, { CSSProperties } from "react";

export type TileContainerProps = {
  content: React.ReactNode;
  loading: boolean;
  tileStyle?: CSSProperties;
};

export default function TileContainer(props: TileContainerProps) {
  return (
    <Skeleton isLoaded={props.loading !== true} borderRadius="2rem">
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        backgroundColor="#19181a"
        borderRadius="2rem"
        padding="4rem"
        boxShadow="dark-lg"
        style={props.tileStyle}
        marginLeft="10rem"
        marginRight="10rem"
      >
        {props.content}
      </Flex>
    </Skeleton>
  );
}
