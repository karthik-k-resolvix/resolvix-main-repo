// src/pages/RegisterPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Heading, FormControl, FormLabel, Input, Textarea,
  Button, VStack, Text, useDisclosure, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalBody, ModalCloseButton, HStack
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../supabaseClient';
import PrivacyPolicyContent from '../components/PrivacyPolicyContent';

export default function RegisterPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brandName: '', email: '', website: '', industry: '', notes: '',
    serviceGuide: null, faqs: null, catalogue: null, name: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const submitBtnRef = useRef();

  useEffect(() => {
    const checkProfile = async () => {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) navigate('/dashboard');
    };
    if (user) checkProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consentGiven) return;
    setSubmitting(true);
    try {
      await supabase.from('profiles').insert({
        id: user.id,
        email: user.email,
        name: formData.name
      });

      const fd = new FormData();
      const meta = { ...formData };
      delete meta.serviceGuide; delete meta.faqs; delete meta.catalogue;
      meta.submittedAt = new Date().toISOString();

      fd.append('metadata', JSON.stringify([meta]));
      if (formData.serviceGuide) fd.append('serviceGuide', formData.serviceGuide);
      if (formData.faqs) fd.append('faqs', formData.faqs);
      if (formData.catalogue) fd.append('catalogue', formData.catalogue);

      const res = await fetch('https://n8n.srv756188.hstgr.cloud/webhook/ce367d9c-cb7c-47ad-acf9-a551a5083a70', {
        method: 'POST', body: fd
      });
      const { short_url } = await res.json();
      window.location.href = short_url || '/dashboard';
    } catch (err) {
      alert('Submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={10} p={6} bg="white" borderRadius="lg" boxShadow="md">
      <Heading fontSize="2xl" mb={4} color="brand.purple">Brand Registration</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Brand Name</FormLabel>
            <Input name="brandName" value={formData.brandName} onChange={handleChange} placeholder="Enter your Brand name" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Support Email</FormLabel>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your support email" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Website URL</FormLabel>
            <Input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://yourbrand.com" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Industry</FormLabel>
            <Input name="industry" value={formData.industry} onChange={handleChange} placeholder="e.g. Fashion, Electronics" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Service Guide (PDF)</FormLabel>
            <Input type="file" name="serviceGuide" accept="application/pdf" onChange={handleChange} />
          </FormControl>

          <FormControl>
            <FormLabel>FAQs (PDF)</FormLabel>
            <Input type="file" name="faqs" accept="application/pdf" onChange={handleChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Product Catalogue (PDF)</FormLabel>
            <Input type="file" name="catalogue" accept="application/pdf" onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Notes for AI Tuning</FormLabel>
            <Textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Any special instructions" />
          </FormControl>

          <HStack justifyContent="space-between" pt={4}>
            <Text fontSize="sm">
              <strong>Please Read and Agree to</strong>{' '}
              <Button variant="link" colorScheme="purple" onClick={onOpen}>Terms & Conditions</Button>
            </Text>
          </HStack>

          <Button
            type="submit"
            colorScheme="purple"
            isDisabled={!consentGiven || submitting}
            isLoading={submitting}
          >
            Submit
          </Button>
        </VStack>
      </form>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxH="80vh">
          <ModalHeader color="brand.purple">Terms and Conditions</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize="sm" color="gray.700">
            <PrivacyPolicyContent />
            <Button
              mt={6}
              colorScheme="purple"
              onClick={() => {
                setConsentGiven(true);
                onClose();
              }}
            >
              I Agree
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
