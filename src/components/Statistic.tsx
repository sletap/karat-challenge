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
        bg={"#f7f9fb"}
        direction="column"
        alignItems="center"
        justifyContent="center"
        marginTop={10}
      >
        <Text fontSize="4xl">{title}</Text>
        {/* TODO: FIX ERROR */}
        <Text fontSize="4xl">{data[stat]}</Text>
        <Text fontSize="1xl">
          <i>Based on {data.total_transactions} Transactions</i>
        </Text>
      </Flex>
    </>
  );
}
