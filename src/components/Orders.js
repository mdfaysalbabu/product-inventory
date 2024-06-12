import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,

} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ActiveOrders from "./ActiveOrders";
import CompletedOrders from "./CompletedOrders";
import OrderForm from "./OrderForm";

const Orders = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const handleModalOpen = (order = null) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <Box p={4}>
      <Heading mb={4}>Sale Orders</Heading>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <Tabs mt={4}>
        <TabList>
          <Tab>Active Orders</Tab>
          <Tab>Completed Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ActiveOrders onEdit={handleModalOpen} />
          </TabPanel>
          <TabPanel>
            <CompletedOrders />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button leftIcon={<AddIcon />} onClick={() => handleModalOpen(null)} mt={4}>
        + Sale Order
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingOrder ? "Edit Sale Order" : "Create Sale Order"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <OrderForm
              onClose={handleModalClose}
              defaultValues={editingOrder || {}}
              readOnly={editingOrder && editingOrder.completed}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Orders;
