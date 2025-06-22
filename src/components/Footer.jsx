// src/components/Footer.jsx
import React, { useState } from 'react';
import { Flex, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, ListItem, UnorderedList } from '@chakra-ui/react';

export default function Footer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
        <Button variant="link" textDecor="underline" mt={{ base: 2, md: 0 }} onClick={onOpen}>
          PRIVACY POLICY
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxH="90vh" overflowY="auto">
          <ModalHeader>Privacy Policy</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize="sm" color="gray.700">
            <UnorderedList mb={2}>
              <ListItem><strong>Effective Date:</strong> 17th June, 2025</ListItem>
              <ListItem><strong>Last Updated:</strong> 17th June, 2025</ListItem>
            </UnorderedList>

            <Text fontWeight="bold" mt={4}>1. Who We Are</Text>
            <Text mb={3}>
              Resolvix is a support automation platform built for Shopify merchants.
              Our app helps businesses resolve customer complaints faster by using order data
              and AI to suggest accurate replies.
            </Text>

            <Text fontWeight="bold" mt={4}>2. Information We Collect</Text>
            <Text>We collect:</Text>
            <UnorderedList mb={2}>
              <ListItem>Store name and domain</ListItem>
              <ListItem>Access tokens for Shopify data</ListItem>
              <ListItem>Basic contact info (e.g., name, email)</ListItem>
            </UnorderedList>
            <Text>We may also process temporarily:</Text>
            <UnorderedList mb={2}>
              <ListItem>Order details</ListItem>
              <ListItem>Customer order history</ListItem>
              <ListItem>Complaint messages and emails</ListItem>
              <ListItem>Product metadata (e.g., images, SKUs)</ListItem>
            </UnorderedList>
            <Text fontWeight="semibold">Note:</Text> <Text mb={3}>We do not collect or store payment information.</Text>

            <Text fontWeight="bold" mt={4}>3. How We Use the Information</Text>
            <UnorderedList mb={2}>
              <ListItem>Match complaints to real orders</ListItem>
              <ListItem>Retrieve customer history for personalization</ListItem>
              <ListItem>Generate AI replies using OpenAI</ListItem>
              <ListItem>Speed up support workflows</ListItem>
              <ListItem>Detect fraud patterns</ListItem>
            </UnorderedList>

            <Text fontWeight="bold" mt={4}>4. Data Storage & Retention</Text>
            <Text mb={1}>We store data securely via Supabase and process it with OpenAI. Stored data includes:</Text>
            <UnorderedList mb={2}>
              <ListItem>Order resolution history</ListItem>
              <ListItem>Merchant settings</ListItem>
              <ListItem>Complaint-linked metadata</ListItem>
            </UnorderedList>
            <Text mb={3}>All data is deleted within 30 days of app uninstall or sooner upon request.</Text>

            <Text fontWeight="bold" mt={4}>5. Sharing of Information</Text>
            <Text mb={1}>We do not sell or share data with advertisers. We only share data with:</Text>
            <UnorderedList mb={3}>
              <ListItem>OpenAI (for AI responses)</ListItem>
              <ListItem>Supabase (for secure storage)</ListItem>
            </UnorderedList>

            <Text fontWeight="bold" mt={4}>6. Merchant & Customer Rights</Text>
            <UnorderedList mb={3}>
              <ListItem>Request view/delete of stored data</ListItem>
              <ListItem>Opt-out of specific features anytime</ListItem>
            </UnorderedList>
            <Text>If customers request deletion (via Shopify), we fully comply.</Text>

            <Text fontWeight="bold" mt={4}>7. Contact Information</Text>
            <Text mb={3}>Email us at <strong>support@resolvix.tech</strong></Text>

            <Text fontWeight="bold" mt={4}>8. Changes to This Policy</Text>
            <Text>We may update this policy and will notify merchants of significant updates via email or app.</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
