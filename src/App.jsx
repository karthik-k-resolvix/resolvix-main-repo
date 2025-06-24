import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import DashboardPage from './auth/DashboardPage';
import ResolvixHomepage from './ResolvixHomepage';
import PaymentSuccess from './auth/PaymentSuccess';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ResolvixHomepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}
