import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, FormLabel } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const OrderForm = ({ isOpen, onClose, onSubmit, defaultValues }) => {
  const { handleSubmit, control, reset } = useForm({ defaultValues });

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create/Edit Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="order-form" onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="customer_id">Customer</FormLabel>
            <Controller
              name="customer_id"
              control={control}
              render={({ field }) => <Input {...field} id="customer_id" />}
            />

            <FormLabel htmlFor="items">Items</FormLabel>
            <Controller
              name="items"
              control={control}
              render={({ field }) => <Input {...field} id="items" />}
            />

            <FormLabel htmlFor="invoice_no">Invoice Number</FormLabel>
            <Controller
              name="invoice_no"
              control={control}
              render={({ field }) => <Input {...field} id="invoice_no" />}
            />

            <FormLabel htmlFor="invoice_date">Invoice Date</FormLabel>
            <Controller
              name="invoice_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} form="order-form" type="submit">
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderForm;
