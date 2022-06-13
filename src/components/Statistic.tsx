import React from "react";
import { Center, Flex, Skeleton, Spinner, Stack, Text } from "@chakra-ui/react";
import { CardStatistics, CategoryMap } from "src/utils/Types";

export default function Statistic({
  title,
  data,
  stat,
}: {
  title: string;
  data: CardStatistics | undefined;
  stat: keyof CardStatistics;
}) {
  if (data == undefined) {
    return (
      <Stack>
        <Skeleton height="300px" />
      </Stack>
    );
  }
  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        marginTop={20}
      >
        <Text fontSize="4xl" align="center">
          {title}
        </Text>
        <Text fontSize="4xl" align="center">
          {data[stat]}
        </Text>
        <Text fontSize="1xl" align="center">
          <i>Based on {data.total_transactions} Transactions</i>
        </Text>
      </Flex>
    </>
  );
}
