import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    if (values.username === 'admin' && values.password === 'password') {
      localStorage.setItem('auth', 'true');
      navigate('/active-orders');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('username')} placeholder="Username" />
        <Input {...register('password')} type="password" placeholder="Password" />
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default Login;
