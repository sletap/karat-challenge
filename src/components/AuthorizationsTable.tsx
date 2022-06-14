import React, { useEffect } from "react";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Tfoot,
  Button,
  Stack,
  Skeleton,
  Spinner,
  Box,
  Text,
} from "@chakra-ui/react";
import { Authorizations } from "src/utils/Types";
import { fetcher } from "src/utils/helpers";
import useSWRInfinite from "swr/infinite";

const getKey = (pageIndex: number, previousPageData: Authorizations) => {
  if (pageIndex == 0) {
    return `/api/getAuthorizations`;
  }
  if (previousPageData && !previousPageData.has_more) return null; // reached the end
  const last_index: number = previousPageData.authorizations.length - 1;
  return `/api/getAuthorizations/${previousPageData.authorizations[last_index].id}`; // SWR key
};

export default function AuthorizationsTable() {
  const { data, error, isValidating, size, setSize } =
    useSWRInfinite<Authorizations>(getKey, fetcher);

  const [canLoadMore, setCanLoadMore] = React.useState(true);
  useEffect(() => {
    if (data && data[data.length - 1].has_more === false) {
      setCanLoadMore(false);
    }
  }, [data]);

  if (error) return <Text align="center">Failed to load information</Text>;

  if (data === undefined) {
    return (
      <Stack>
        <Skeleton height="50px" />
        <Skeleton height="50px" />
        <Skeleton height="50px" />
        <Skeleton height="50px" />
        <Skeleton height="50px" />
        <Skeleton height="50px" />
      </Stack>
    );
  }

  const TableContents = () => {
    if (data[0].authorizations.length === 0) {
      return 0;
    }

    let final_list = [];
    let max_size = isValidating ? size - 1 : size;
    for (let i = 0; i < max_size; i++) {
      let iteration = data[i].authorizations.map((auth) => (
        <Tr key={auth.id}>
          <Td> {auth.created} </Td>
          <Td> {auth.merchant_data.name} </Td>
          <Td> {auth.merchant_data.city} </Td>
          <Td> {auth.approved ? "Approved" : "Declined"} </Td>
          <Td isNumeric> {auth.amount} </Td>
        </Tr>
      ));
      final_list.push(...iteration);
    }
    return final_list;
  };

  const Headings = () => {
    return (
      <Tr>
        <Th>Date</Th>
        <Th>Description</Th>
        <Th>City</Th>
        <Th>Status</Th>
        <Th isNumeric>Amount</Th>
      </Tr>
    );
  };

  return (
    <>
      <TableContainer>
        <Table size="lg" variant="striped" colorScheme="telegram">
          <TableCaption placement="top">
            All Authorizations On Your Card
          </TableCaption>
          <Thead>{Headings()}</Thead>
          {data[0].authorizations.length !== 0 && (
            <>
              <Tbody>{TableContents()}</Tbody>
              <Tfoot>{Headings()}</Tfoot>
            </>
          )}
        </Table>
        <Button
          isDisabled={!canLoadMore}
          width="100%"
          onClick={() => setSize(size + 1)}
        >
          {canLoadMore ? "LOAD MORE AUTHORIZATIONS" : "ALL DATA LOADED"}
          <Box marginLeft={2}> {isValidating && <Spinner />} </Box>
        </Button>
      </TableContainer>
    </>
  );
}
