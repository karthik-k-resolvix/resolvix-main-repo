// src/pages/RegisterPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Heading, FormControl, FormLabel, Input, Textarea,
  Button, VStack, Text, useDisclosure, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalBody, ModalCloseButton, HStack
} from '@chakra-ui/react';
import { redirect, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../supabaseClient';
import PrivacyPolicyContent from '../components/PrivacyPolicyContent';
import Footer from '../components/Footer';
import Header from '../components/Header';

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
      // Insert minimal profile data into Supabase

      const fd = new FormData();

      // Add metadata fields except file objects
      const metadata = {
        brandName: formData.brandName,
        email: formData.email,
        website: formData.website,
        industry: formData.industry,
        notes: formData.notes,
        name: formData.name
      };

      fd.append('metadata', JSON.stringify([metadata]));

      // Append files to formData
      if (formData.serviceGuide instanceof File) fd.append('serviceGuide', formData.serviceGuide);
      if (formData.faqs instanceof File) fd.append('faqs', formData.faqs);
      if (formData.catalogue instanceof File) fd.append('catalogue', formData.catalogue);

      // Actual file upload
      const res = await fetch('https://n8n.srv756188.hstgr.cloud/webhook/ce367d9c-cb7c-47ad-acf9-a551a5083a70', {
        method: 'POST',
        body: fd
      });
        
      const respJson = await res.text();
      const redirectUrl = JSON.parse(respJson);
  if (redirectUrl && res.ok) {
    window.location.href = redirectUrl.short_url  || '/dashboard'; // 🚀 perform the redirect
  }

    } catch (err) {
      console.error(err);

      alert('Submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Box bg='brand.bgSecondary'>
        <Header />
        <Box maxW="600px" mx="auto" mt={10} p={6} bg="white" borderRadius="lg" boxShadow="md">
          <Heading fontSize="2xl" mb={4} color="brand.purple">Brand Registration</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input name="name" value={formData.name} onChange={handleChange} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Brand Name</FormLabel>
                <Input name="brandName" value={formData.brandName} onChange={handleChange} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Support Email</FormLabel>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Website URL</FormLabel>
                <Input type="url" name="website" value={formData.website} onChange={handleChange} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Industry</FormLabel>
                <Input name="industry" value={formData.industry} onChange={handleChange} />
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
                <Textarea name="notes" value={formData.notes} onChange={handleChange} />
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
      </Box>
      <Footer />
    </div>
  );
}
