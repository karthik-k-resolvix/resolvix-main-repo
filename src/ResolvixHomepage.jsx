import React from 'react';
import {
  Box, Flex, Heading, Text, Button, Stack, SimpleGrid, VStack, HStack, Icon,
} from '@chakra-ui/react';
import {
  FaUsers, FaExclamationTriangle, FaCommentDots, FaBrain,
  FaHistory, FaFlag, FaEnvelope, FaRobot
} from 'react-icons/fa';
import { Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function ResolvixHomepage() {
   const navigate = useNavigate();

  const handleTryNow = () => {
    navigate('/login');
  };

  const handleBookDemo = () => {
    navigate('/login');
  };

  return (
    <Box bg="brand.bgPrimary" color="brand.textPrimary" minH="100vh">
      {/* Header */}
      <Flex justify="space-between" align="center" px={6} py={4} borderBottom="1px solid" borderColor="brand.edgeLines">
        <Heading size="md" display="flex" alignItems="center" gap={2}>
          <Box as="span" color="brand.buttonPrimary">🌀</Box> RESOLVIX
        </Heading>
        <HStack spacing={4}>
          <Button variant="ghost" color="brand.textPrimary" onClick={handleBookDemo}>Log in</Button>
        </HStack>
      </Flex>

      {/* Hero */}
      <Box textAlign="center" py={20} px={6}>
        <Heading size="2xl" mb={4}>Support that Understands. Resolutions that Stick.</Heading>
        <Text fontSize="lg" maxW="2xl" mx="auto" mb={8}>
          Resolvix is an AI-powered resolution platform that handles e-commerce complaints with empathy, intelligence, and zero setup.
        </Text>
        <HStack justify="center" spacing={4}>
          <Button bg="brand.error" color="white" _hover={{ opacity: 0.9 }} onClick={handleTryNow}>
            Try Resolvix Now
          </Button>
          <Button variant="outline" borderColor="brand.textPrimary" color="brand.textPrimary">
            Book a Demo
          </Button>
        </HStack>
      </Box>

      {/* Support Challenge */}
      <Box bg="brand.bgSecondary" py={16} px={6}>
        <Heading size="lg" textAlign="center" mb={10}>The Real Support Challenge</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} maxW="4xl" mx="auto">
          <HStack align="start" bg="white" color="black" p={4} borderRadius="xl">
            <Icon as={FaUsers} boxSize={6} color="brand.buttonPrimary" />
            <Text><strong>682+ tickets/month</strong> on average for D2C brands</Text>
          </HStack>
          <HStack align="start" bg="white" color="black" p={4} borderRadius="xl">
            <Icon as={FaExclamationTriangle} boxSize={6} color="brand.warning" />
            <Text><strong>1 in 3 e-commerce merchants</strong> face refund abuse</Text>
          </HStack>
          <HStack align="start" bg="white" color="black" p={4} borderRadius="xl">
            <Icon as={FaCommentDots} boxSize={6} color="brand.buttonSecondary" />
            <Text>Most queries leave agents and customers <strong>frustrated</strong></Text>
          </HStack>
          <HStack align="start" bg="white" color="black" p={4} borderRadius="xl">
            <Icon as={FaRobot} boxSize={6} color="brand.aiLayer" />
            <Text>Adjusts language to <strong>mood</strong> – Trustratel</Text>
          </HStack>
        </SimpleGrid>
      </Box>

      {/* Advantage */}
      <Box py={16} px={6}>
        <Heading size="lg" textAlign="center" mb={10}>The Resolvix Advantage</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} maxW="6xl" mx="auto">
          <VStack bg="brand.aiLayer" p={6} borderRadius="xl" color="white">
            <Icon as={FaBrain} boxSize={8} />
            <Text fontWeight="bold">Context-aware engines</Text>
          </VStack>
          <VStack bg="brand.buttonPrimary" p={6} borderRadius="xl" color="white">
            <Icon as={FaHistory} boxSize={8} />
            <Text fontWeight="bold">Learns from past interactions</Text>
          </VStack>
          <VStack bg="brand.warning" p={6} borderRadius="xl" color="black">
            <Icon as={FaFlag} boxSize={8} />
            <Text fontWeight="bold">Flags suspicious behavior</Text>
          </VStack>
          <VStack bg="brand.buttonSecondary" p={6} borderRadius="xl" color="black">
            <Icon as={FaEnvelope} boxSize={8} />
            <Text fontWeight="bold">Zero-setup onboarding</Text>
          </VStack>
          <VStack bg="brand.gradientOverlay" p={6} borderRadius="xl" color="white">
            <Icon as={FaUsers} boxSize={8} />
            <Text fontWeight="bold">Works with Zendesk</Text>
          </VStack>
          <VStack bg="brand.ctaOnboarding" p={6} borderRadius="xl" color="black">
            <Icon as={FaRobot} boxSize={8} />
            <Text fontWeight="bold">Adjusts language to mood</Text>
          </VStack>
        </SimpleGrid>
      </Box>

      {/* Integration */}
      <Box py={16} px={6}>
       <Heading size="lg" textAlign="center" mb={10}>Solutions Offered</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} maxW="6xl" mx="auto">
          <Box bg="white" color='black' p={6} borderRadius="xl" shadow="md">
            <Heading size="sm" mb={2}>Email</Heading>
            <Text>Activate support by simply configuring your support email.</Text>
          </Box>
          <Box bg="white" color='black' p={6} borderRadius="xl" shadow="md">
            <Heading size="sm" mb={2}>Zendesk</Heading>
            <Text>Tag your tickets, and Resolvix will auto-respond contextually.</Text>
          </Box>
          <Box bg="white" color='black' p={6} borderRadius="xl" shadow="md">
            <Heading size="sm" mb={2}>Custom Integration</Heading>
            <Text>Use our webhook (coming soon) to customize support on your stack.</Text>
          </Box>
        </SimpleGrid>
      </Box>

    {/* Contact Us */}
<Box bg="brand.bgSecondary" color="brand.textPrimary" py={20} px={6} textAlign="center">
  <Heading size="lg" mb={4}>Contact Us</Heading>
  <Box width="60px" height="2px" bg="brand.warning" mx="auto" mb={6} borderRadius="full" />
  
  <Text fontSize="xl" fontWeight="medium" mb={2}>
    Let’s Fix Customer Support—Together
  </Text>
  <Text color="brand.textSecondary" mb={6}>
    We love our customers, so feel free to visit during normal business hours.
  </Text>

  <Text fontWeight="bold" fontSize="md">Email</Text>
  <Text color="brand.textSecondary">karthik.k@resolvix.tech</Text>
</Box>

{/* Footer */}
<Flex
  direction={{ base: "column", md: "row" }}
  justify="space-between"
  align="center"
  px={6}
  py={6}
  bg="white"
  color="gray.600"
  fontSize="sm"
>
  <Text>&copy; 2025 Resolvix - All Rights Reserved.</Text>
  <Text textDecor="underline" mt={{ base: 2, md: 0 }}>PRIVACY POLICY</Text>

</Flex>

    </Box>
  );
}
