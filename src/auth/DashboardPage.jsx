// src/auth/DashboardPage.jsx
// src/auth/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import {
  Button,
  VStack,
  Box,
  Text,
  Select,
  useColorModeValue
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Footer from '../components/Footer';
import Header from '../components/Header';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DashboardPage() {
  const [userData, setUserData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('June');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const boxBg = useColorModeValue('#f5f5f5', '#1A202C');
  const textColor = useColorModeValue('#333', '#f0e7db');

  useEffect(() => {
  const fetchUserData = async () => {
    const email = localStorage.getItem('email');

    // Fallback to dummy data if no email (testing mode)
    if (!email) {
      const dummyUserData = {
        brandId: "BR12345",
        brandName: "Demo Brand",
        users: 5,
        plan: "Pro",
        tokensLeft: 3400,
        lastTicketUpdated: "2025-06-20",
        profileCreated: "2025-01-15",
        lastUsed: "2025-06-22",
        ticketStats: {
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          tickets: [40, 50, 60, 55, 70, 65],
          repeats: [10, 12, 9, 11, 13, 10],
          frauds: [1, 2, 0, 1, 3, 1]
        },
        riskSeverity: {
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          risk: [12, 15, 13, 14, 11, 16],
          severity: [30, 25, 28, 22, 35, 27]
        },
        summary: [
          "Delayed delivery",
          "Wrong item shipped",
          "Product not received",
          "Refund not processed",
          "Customer changed mind"
        ]
      };

      setUserData(dummyUserData);
      setLoading(false);
      return;
    }

    // Fetch from Supabase if email exists
    const { data, error } = await supabase
      .from('userlogin')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error(error);
      navigate('/login');
    } else {
      setUserData(data);
      setLoading(false);
    }
  };

  if (!userData) fetchUserData();
}, [navigate, userData]);

  const logout = () => {
    localStorage.removeItem('email');
    navigate('/login');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('User Report', 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [['Field', 'Value']],
      body: [
        ['Brand ID', userData.brandId],
        ['Brand Name', userData.brandName],
        ['Users', userData.users],
        ['Plan', userData.plan],
        ['Tokens Left', userData.tokensLeft],
        ['Last Ticket Updated', userData.lastTicketUpdated],
      ],
    });
    doc.save('user_report.pdf');
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      {
        BrandID: userData.brandId,
        BrandName: userData.brandName,
        Users: userData.users,
        Plan: userData.plan,
        TokensLeft: userData.tokensLeft,
        LastTicketUpdated: userData.lastTicketUpdated,
      },
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'UserData');
    XLSX.writeFile(workbook, 'user_report.xlsx');
  };

  const handleRenew = () => console.log('Renew plan webhook called');
  const handleCancel = () => console.log('Cancel plan webhook called');
  const handleEditProfile = () => console.log('Edit profile webhook called');

  const currentMonthIndex = userData?.ticketStats?.months?.indexOf(selectedMonth);
  const graph1Data = userData?.ticketStats && currentMonthIndex >= 0 && {
    labels: ['Tickets', 'Repeat Customers', 'Fraud Cases'],
    datasets: [
      {
        label: selectedMonth,
        data: [
          userData.ticketStats.tickets[currentMonthIndex],
          userData.ticketStats.repeats[currentMonthIndex],
          userData.ticketStats.frauds[currentMonthIndex],
        ],
        backgroundColor: ['#3182ce', '#38a169', '#e53e3e'],
      },
    ],
  };

  const graph2Data = userData?.riskSeverity && currentMonthIndex >= 0 && {
    labels: ['Risk %', 'Severity %'],
    datasets: [
      {
        label: selectedMonth,
        data: [
          userData.riskSeverity.risk[currentMonthIndex],
          userData.riskSeverity.severity[currentMonthIndex],
        ],
        backgroundColor: ['#ed8936', '#9f7aea'],
      },
    ],
  };

  if (!userData || loading) return <Text>Loading dashboard...</Text>;

  return (
    <div>
      <Header/>
    <VStack spacing={6} px={6} py={8} align="stretch" bg={boxBg} color={textColor}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold">Profile and Analytics</Text>
      </Box>

      <Text fontSize="xl" fontWeight="semibold">User Details</Text>

      <Box display="grid" gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
        <Box p={4} borderWidth={1} borderRadius="2xl" bg="white" boxShadow="md">
          <Text><strong>User Brand ID:</strong> {userData.brandId}</Text>
          <Text><strong>Brand Name:</strong> {userData.brandName}</Text>
          <Text><strong>Number of Users:</strong> {userData.users}</Text>
          <Text><strong>Profile Created:</strong> {userData.profileCreated}</Text>
          <Text><strong>Last Used:</strong> {userData.lastUsed}</Text>
          <Button mt={2} onClick={handleEditProfile} colorScheme="blue">Edit</Button>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="2xl" bg="white" boxShadow="md">
          <Text><strong>Plan:</strong> {userData.plan}</Text>
          <Text><strong>Tokens Left:</strong> {userData.tokensLeft}</Text>
          <Box display="flex" gap={2} mt={2}>
            <Button onClick={handleRenew} colorScheme="green">Renew</Button>
            <Button onClick={handleCancel} colorScheme="red">Cancel</Button>
          </Box>
        </Box>
      </Box>

      <Text fontSize="xl" fontWeight="semibold">Performance During the Month</Text>
      <Box>
        <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} width="200px">
          {userData.ticketStats?.months.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </Select>
      </Box>

      {graph1Data && (
        <Box p={4} borderWidth={1} borderRadius="2xl" bg="white" boxShadow="md">
          <Bar data={graph1Data} />
          <Text fontSize="sm" mt={2}>Data for selected month: {selectedMonth}</Text>
        </Box>
      )}

      {graph2Data && (
        <Box p={4} borderWidth={1} borderRadius="2xl" bg="white" boxShadow="md">
          <Bar data={graph2Data} />
        </Box>
      )}

      <Box p={4} borderWidth={1} borderRadius="2xl" bg="white" boxShadow="lg">
        <Text fontWeight="bold" mb={2}>Top 5 Issue Ticket Types:</Text>
        <Box as="ul" pl={4} style={{ listStyleType: 'disc' }}>
          {userData.summary?.map((s, idx) => <li key={idx}>{s}</li>)}
        </Box>
        <Text mt={2}>Last Ticket Updated: {userData.lastTicketUpdated}</Text>
      </Box>

      <Box display="flex" gap={4}>
        <Button onClick={handleDownloadPDF} colorScheme="blue">Download PDF</Button>
        <Button onClick={handleDownloadExcel} colorScheme="purple">Download Excel</Button>
      </Box>
      
    </VStack>
<Footer/>    
</div>
  );
}
