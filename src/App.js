import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Button, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Login from './components/Login';
import ActiveOrders from './components/ActiveOrders';
import CompletedOrders from './components/CompletedOrders';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');

  return (
    <Box>
      <Flex justify="space-between" p={4}>
        <Button onClick={toggleColorMode}>
          Toggle {text} mode
        </Button>
      </Flex>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/active-orders" element={<ProtectedRoute><ActiveOrders /></ProtectedRoute>} />
        <Route path="/completed-orders" element={<ProtectedRoute><CompletedOrders /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Box>
  );
}

export default App;
