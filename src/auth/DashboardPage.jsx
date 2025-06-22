import { useAuth } from './AuthProvider';
import { Text, VStack, Button } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <VStack mt={20} spacing={4}>
      <Text>Welcome back, {user?.email}</Text>
      <Button onClick={() => supabase.auth.signOut()} colorScheme="red">Logout</Button>
    </VStack>
  );
}
