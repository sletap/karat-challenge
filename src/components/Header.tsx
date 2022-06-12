import React from "react";
import { Box, Flex, Heading, theme } from "@chakra-ui/react";

export default function Header() {
  return (
    <>
      <Flex bg={"#d6e6f7"} align="center" justify="center" paddingBottom={5}>
        <Heading as="h1" size="4xl" noOfLines={1}>
          Welcome To Your Karat Dashboard!
        </Heading>
      </Flex>
    </>
  );
}
