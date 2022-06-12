import { Box, Center, Grid, GridItem, Spinner, theme } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import useSwr from "swr";
import AuthorizationsTable from "src/components/AuthorizationsTable";
import fetcher from "src/utils/fetcher";
import DoughnutChart from "src/components/DoughnutChart";
import { CardStatistics } from "src/utils/Types";
import Header from "src/components/Header";
import Statistic from "src/components/Statistic";
const Home: NextPage = () => {
  const { data, error } = useSwr<CardStatistics>(
    "/api/getCardholderStatistics",
    fetcher
  );

  if (error) return <div>Failed to load credit card</div>;

  return (
    <Box bg={theme.colors.gray[100]}>
      <Head>
        <title>Karat Dashboard</title>
        <meta name="description" content="Karat Card Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Grid
        h={theme.sizes.container.sm}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={5}
        margin={10}
      >
        <GridItem
          rowSpan={2}
          colSpan={3}
          borderRadius={40}
          bg={theme.colors.gray[50]}
        >
          <DoughnutChart statistics={data} />
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          bg={theme.colors.gray[50]}
          borderRadius={40}
        >
          <Statistic title="Total Spend" data={data} stat="total_spend" />
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          bg={theme.colors.gray[50]}
          borderRadius={40}
        >
          <Statistic title="Average Spend" data={data} stat="average_spend" />
        </GridItem>
      </Grid>
      <Box margin={10} bg={theme.colors.gray[50]}>
        <AuthorizationsTable />
      </Box>
    </Box>
  );
};

export default Home;
