import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export type CountdownProps = {
  startTimeMs: number;
  endTimeMs: number;
};

export function Countdown(props: CountdownProps) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  let prefix = "";

  const render = (prefix: string, time: string) => {
    return (
      <Flex direction="column">
        <Heading as="h5" size="sm" color="white" marginBottom="1rem">
          {prefix}
        </Heading>
        <Heading as="h3" size="lg" color="white">
          {time}
        </Heading>
      </Flex>
    );
  };

  const formatMs = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / 1000 / 3600) % 24);
    const days = Math.floor(ms / 1000 / (3600 * 24));

    const humanized =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s";

    return humanized;
  };

  let difference: number;
  if (now < props.startTimeMs) {
    prefix = "Starts in ";
    difference = props.startTimeMs - now;
  } else if (now < props.endTimeMs) {
    prefix = "Ends in ";
    difference = props.endTimeMs - now;
  } else {
    return render("Auction has ended", null);
  }

  return render(prefix, formatMs(difference));
}
