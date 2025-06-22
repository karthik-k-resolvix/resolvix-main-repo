// src/components/Footer.jsx
import React, { useState } from 'react';
import { Flex, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, ListItem, UnorderedList } from '@chakra-ui/react';
import PrivacyPolicyContent from './PrivacyPolicyContent';

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
         <PrivacyPolicyContent/>
        </ModalContent>
      </Modal>
    </>
  );
}
