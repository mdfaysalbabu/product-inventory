import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const fetchSaleOrders = async () => {
  const { data } = await axios.get('http://localhost:5000/api/saleOrders');
  return data;
};

const CompletedOrders = () => {
  const { data, error, isLoading } = useQuery(['saleOrders'], fetchSaleOrders);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Invoice No</Th>
            <Th>Invoice Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(order => (
            <Tr key={order.invoice_no}>
              <Td>{order.invoice_no}</Td>
              <Td>{order.invoice_date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CompletedOrders;
