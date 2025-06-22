// src/pages/LoginPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Image,
  Flex
} from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mode, setMode] = useState('login');
  const navigate = useNavigate();

  const CLIENT_ID = '591135447964-eaa0k7p6h0sabjpbb0da8qlfthjk78p3.apps.googleusercontent.com';

  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/dashboard');
  };

  const handleEmailRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else navigate('/register');
  };

  const handleCredentialResponse = (response) => {
    if (!response.credential) {
      alert("Google login failed.");
      return;
    }
    const token = response.credential;
    // const decoded = jwtDecode(token);
    localStorage.setItem("google_token", token);
    navigate('/register');
  };

  const handleGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.prompt();
    } else {
      alert("Google script failed to load.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
     <Box bg="brand.bgPrimary" color="brand.textPrimary">
        {/* Header */}
              <Flex justify="space-between" align="center" px={6} py={4} borderBottom="1px solid" borderColor="brand.edgeLines">
                <Heading size="md" display="flex" alignItems="center" gap={2}>
                  <Box as="span" color="brand.buttonPrimary">🌀</Box> RESOLVIX
                </Heading>
              </Flex>
    <Box
      maxW="lg"
      mx="auto"
      mt={20}
      p={8}
      borderRadius="lg"
      bg="white"
      boxShadow="lg"
    >
      <Heading
        textAlign="center"
        fontSize="3xl"
        color="brand.warning"
        fontWeight="bold"
        mb={2}
      >
        {mode === 'login' ? 'Login to Resolvix' : 'Register for Resolvix'}
      </Heading>
      <Box
        w="60px"
        h="2px"
        bg="gray.200"
        mx="auto"
        mb={4}
        borderRadius="full"
      />
      <Text color="gray.500" textAlign="center" mb={8}>
        {mode === 'login'
          ? 'Access powerful complaint resolution tools with just a few clicks.'
          : 'Create your account to get started with Resolvix.'}
      </Text>

      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel color="gray.500">Email</FormLabel>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color="gray.500">Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        {mode === 'register' && (
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
        )}

        <Button
          mt={4}
          bg="brand.warning"
          color="black"
          fontWeight="bold"
          size="lg"
          width="100%"
          onClick={mode === 'login' ? handleEmailLogin : handleEmailRegister}
          _hover={{ bg: '#f1c40f' }}
        >
          {mode === 'login' ? 'LOGIN WITH EMAIL' : 'REGISTER'}
        </Button>

        <Text>OR</Text>

        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          size="lg"
          width="100%"
          leftIcon={
            <Image
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              boxSize="20px"
            />
          }
        >
          Sign in with Google
        </Button>

        <Text fontSize="sm" color="gray.500" textAlign="center" mt={4}>
          {mode === 'login' ? 'New user?' : 'Already have an account?'}{' '}
          <Button
            variant="link"
            color="brand.buttonPrimary"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login' ? 'Register here' : 'Login here'}
          </Button>
        </Text>
      </VStack>
    </Box>
    <Footer />
    </Box>
  );
}