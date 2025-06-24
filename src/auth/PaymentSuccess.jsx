// src/pages/PaymentSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Spinner, VStack } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 30000); // 30 seconds

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <Box>
        <Header/>
    <VStack justify="center" align="center" minH="100vh" spacing={6} bg="#f0f4f8">
      <Box
        p={10}
        borderRadius="2xl"
        boxShadow="lg"
        bg="white"
        textAlign="center"
        maxW="md"
      >
        <Text fontSize="2xl" fontWeight="bold" color="green.500">
          ✅ Payment Successful
        </Text>
        <Text mt={4}>You will be redirected to your dashboard shortly.</Text>
        <Spinner mt={6} size="lg" color="blue.500" />
        <Text mt={4} fontSize="sm" color="gray.500">
          Redirecting in 30 seconds...
        </Text>
      </Box>
    </VStack>
    <Footer/>
    </Box>
  );
}
