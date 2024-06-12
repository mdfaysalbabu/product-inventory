import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Spinner,
  Center,
  Text,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const fetchSaleOrders = async () => {
  const { data } = await axios.get("http://localhost:5000/api/saleOrders");
  return data;
};

const ActiveOrders = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: 'saleOrders',
    queryFn: fetchSaleOrders,
  });

  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCreateModalOpen = () => {
    reset();
    setCreateModalOpen(true);
  };
  const handleCreateModalClose = () => setCreateModalOpen(false);

  const handleEditModalOpen = (order) => {
    setSelectedOrder(order);
    reset(order);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => setEditModalOpen(false);

  const onSubmit = async (data) => {
    try {
      if (selectedOrder) {
        await axios.put(`http://localhost:5000/api/saleOrders/${selectedOrder.id}`, data);
        toast({
          title: "Success",
          description: "Sale order updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await axios.post("http://localhost:5000/api/saleOrders", data);
        toast({
          title: "Success",
          description: "Sale order created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      queryClient.invalidateQueries("saleOrders");
      setCreateModalOpen(false);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error submitting sale order:", error);
      toast({
        title: "Error",
        description: "An error occurred while submitting the sale order. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) return (
    <Center>
      <Spinner size="xl" />
    </Center>
  );

  if (error) return (
    <Center>
      <Text color="red.500">Error: {error.message}</Text>
    </Center>
  );

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">Sale Orders</Text>
        <Button colorScheme="blue" onClick={handleCreateModalOpen}>
          Add Sale Order
        </Button>
      </Flex>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Invoice No</Th>
            <Th>Invoice Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((order) => (
              <Tr key={order.invoice_no}>
                <Td>{order.invoice_no}</Td>
                <Td>{order.invoice_date}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    onClick={() => handleEditModalOpen(order)}
                  >
                    Edit
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      {/* Create Sale Order Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={handleCreateModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Sale Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Invoice Number</FormLabel>
                  <Input {...register("invoice_no")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Invoice Date</FormLabel>
                  <Input type="date" {...register("invoice_date")} />
                </FormControl>
                <Button colorScheme="blue" type="submit">
                  Create
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Edit Sale Order Modal */}
      <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Sale Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Invoice Number</FormLabel>
                  <Input {...register("invoice_no")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Invoice Date</FormLabel>
                  <Input type="date" {...register("invoice_date")} />
                </FormControl>
                <Button colorScheme="blue" type="submit">
                  Save Changes
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ActiveOrders;
