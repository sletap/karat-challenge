import React from "react";
import { Box, Flex, Heading, theme } from "@chakra-ui/react";

export default function Header() {
  return (
    <>
      <Flex align="center" justify="center">
        <Heading size="2xl" noOfLines={1}>
          Welcome To Your Karat Dashboard!
        </Heading>
      </Flex>
    </>
  );
}
