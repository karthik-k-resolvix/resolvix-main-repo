// src/components/PrivacyPolicyContent.jsx
import React from 'react';
import { Box, Heading, Text, List, ListItem } from '@chakra-ui/react';

export default function PrivacyPolicyContent() {
  return (
    <Box lineHeight={1.7}>
      <Text fontStyle="italic" mb={4}>
        <List spacing={1}>
          <ListItem>Effective Date: 17th June, 2025</ListItem>
          <ListItem>Last Updated: 17th June, 2025</ListItem>
        </List>
      </Text>

      <Heading size="sm" mt={4}>1. Who We Are</Heading>
      <Text>Resolvix is a support automation platform built for Shopify merchants. Our app helps businesses resolve customer complaints faster by using order data and AI to suggest accurate replies.</Text>

      <Heading size="sm" mt={4}>2. Information We Collect</Heading>
      <Text>We collect the following data from merchants who install our app:</Text>
      <List spacing={1} pl={4} mt={1}>
        <ListItem>• Store name and domain</ListItem>
        <ListItem>• Access tokens to securely access your Shopify data</ListItem>
        <ListItem>• Basic merchant contact info (e.g. name, email)</ListItem>
      </List>
      <Text mt={2}>We may also access and temporarily process:</Text>
      <List spacing={1} pl={4}>
        <ListItem>• Order details (product names, status, shipping)</ListItem>
        <ListItem>• Customer order history</ListItem>
        <ListItem>• Complaint messages and emails</ListItem>
        <ListItem>• Product metadata (images, SKUs)</ListItem>
      </List>
      <Text mt={2}><strong>Note:</strong> We do not collect or store payment information.</Text>

      <Heading size="sm" mt={4}>3. How We Use the Information</Heading>
      <List spacing={1} pl={4}>
        <ListItem>• Match complaints to real orders</ListItem>
        <ListItem>• Personalize responses using order history</ListItem>
        <ListItem>• Generate replies using OpenAI</ListItem>
        <ListItem>• Improve support and detect fraud</ListItem>
      </List>

      <Heading size="sm" mt={4}>4. Data Storage & Retention</Heading>
      <Text>Data is stored on Supabase and processed by OpenAI. We only retain:</Text>
      <List spacing={1} pl={4}>
        <ListItem>• Data for complaint resolution</ListItem>
        <ListItem>• Merchant configuration</ListItem>
        <ListItem>• Order-level metadata linked to support</ListItem>
      </List>
      <Text>All data is deleted within 30 days of uninstall, or sooner upon request.</Text>

      <Heading size="sm" mt={4}>5. Sharing of Information</Heading>
      <Text>We never sell data. It’s shared only with:</Text>
      <List spacing={1} pl={4}>
        <ListItem>• OpenAI (for AI generation)</ListItem>
        <ListItem>• Supabase (secure storage)</ListItem>
      </List>

      <Heading size="sm" mt={4}>6. Merchant & Customer Rights</Heading>
      <List spacing={1} pl={4}>
        <ListItem>• Request or delete stored data anytime</ListItem>
        <ListItem>• Opt out of specific features</ListItem>
      </List>
      <Text>If a Shopify customer requests deletion, we comply within required timelines.</Text>

      <Heading size="sm" mt={4}>7. Contact Information</Heading>
      <Text>For questions or data requests, contact <strong>support@resolvix.tech</strong></Text>

      <Heading size="sm" mt={4}>8. Changes to This Policy</Heading>
      <Text>We may update this Privacy Policy based on legal or operational changes. Merchants will be notified via email or app alerts for major updates.</Text>
    </Box>
  );
}
