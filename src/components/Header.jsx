// src/components/Footer.jsx
import { Flex, Button, Heading, Box, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate();
 const logout = () => {
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <>
     <Box bg="brand.bgPrimary" color="brand.textPrimary">
      <Flex justify="space-between" align="center" px={6} py={4} borderBottom="1px solid" borderColor="brand.edgeLines">
             <Heading size="md" display="flex" alignItems="center" gap={2}>
               <Box as="span" color="brand.buttonPrimary">🌀</Box> RESOLVIX
             </Heading>
             <HStack spacing={4}>
               <Button variant="ghost" color="brand.textPrimary" onClick={logout}>Log Out</Button>
             </HStack>
           </Flex>
           </Box>
    </>
  );
}
