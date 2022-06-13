import { Box, Text, Grid, GridItem, theme } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import useSwr from "swr";
import AuthorizationsTable from "src/components/AuthorizationsTable";
import { fetcher } from "src/utils/helpers";
import DoughnutChart from "src/components/DoughnutChart";
import { CardStatistics } from "src/utils/Types";
import Header from "src/components/Header";
import Statistic from "src/components/Statistic";

const Home: NextPage = () => {
  const { data, error } = useSwr<CardStatistics>(
    "/api/getCardStatistics",
    fetcher
  );

  if (error) return <Text align="center">Failed to load cardholder stats</Text>;

  return (
    <Box>
      <Head>
        <title>Karat Dashboard</title>
        <meta name="description" content="Karat Card Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box marginTop={10}>
        <Header />
      </Box>
      <Grid
        h={theme.sizes.container.sm}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={5}
        margin={10}
      >
        <GridItem rowSpan={2} colSpan={3} borderRadius={30}>
          <DoughnutChart statistics={data} />
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          bg={theme.colors.blackAlpha[400]}
          borderRadius={30}
        >
          <Statistic title="Total Spend" data={data} stat="total_spend" />
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          bg={theme.colors.blackAlpha[400]}
          borderRadius={30}
        >
          <Statistic title="Average Spend" data={data} stat="average_spend" />
        </GridItem>
      </Grid>
      <Box margin={10} bg={theme.colors.blackAlpha[400]}>
        <AuthorizationsTable />
      </Box>
    </Box>
  );
};

export default Home;
