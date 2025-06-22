import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { VStack, Input, Button, Text, Heading } from '@chakra-ui/react';

export default function RegisterPage() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) navigate('/dashboard');
    };
    if (user) checkProfile();
  }, [user]);

  const handleSubmit = async () => {
    await supabase.from('profiles').insert({ id: user.id, email: user.email, name });
    navigate('/dashboard');
  };

  return (
    <VStack spacing={4} mt={20}>
      <Heading size="md">Complete Your Registration</Heading>
      <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={handleSubmit} colorScheme="blue">Continue</Button>
    </VStack>
  );
}
