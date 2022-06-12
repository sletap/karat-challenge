import React from "react";
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
} from "@chakra-ui/react";
import { Authorizations } from "src/utils/Types";
import fetcher from "src/utils/fetcher";
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
  if (error) return <div>Failed to load credit card</div>;

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
    for (let i = 0; i < size; i++) {
      try {
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
      } catch (error) {} // hacky?
    }
    return final_list;
  };

  const loadMoreAuthorizations = () => {
    if (data[data.length - 1].has_more) {
      setSize(size + 1);
    } else {
      setCanLoadMore(false);
    }
  };

  return (
    <>
      <TableContainer>
        <Table size="lg" variant="striped" colorScheme="telegram">
          <TableCaption placement="top">
            All Authorizations On Your Card
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>City</Th>
              <Th>Status</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>{TableContents()}</Tbody>
          <Tfoot>
            <Tr>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>City</Th>
              <Th>Status</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Tfoot>
        </Table>
        <Button
          isDisabled={!canLoadMore}
          width="100%"
          onClick={loadMoreAuthorizations}
        >
          {canLoadMore ? "LOAD MORE AUTHORIZATIONS" : "ALL DATA LOADED"}
          <Box marginLeft={2}>{isValidating && <Spinner />}</Box>
        </Button>
      </TableContainer>
    </>
  );
}
